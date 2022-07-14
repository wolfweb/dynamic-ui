import type { InjectionKey } from 'vue';

import validators from '@/utils/validators';

import { nanoid } from 'nanoid';
import { CacheType } from '@/enums/cache';
import { SchemaMode } from '@/enums/schemaMode';
import { useSchemaStore } from '@/store/modules/schemaStore';
import { flatMap, remove, find, isNil } from 'lodash-es';
import { reactive, inject, provide, readonly, computed } from 'vue';

const editInjectKey: InjectionKey<ReturnType<typeof ModelContext>> = Symbol();
const appInjectKey: InjectionKey<AppContext> = Symbol();

export class FormElementMetadata implements IFormElementMetadata {
  id: string
  key: string
  display: string
  attributes: Dictionary<any>
  dataBinder: Nullable<WidgetDataBinder>
  validation: Array<WidgetValidation>
  childes?: Array<IFormElementChildGroupMetadata>
}

export class LayoutElementMetadata implements ILayoutElementMetadata {
  id: string
  key: string
  display: string
  attributes: Dictionary<any>
  childes: Array<IFormElementChildGroupMetadata>
}

export class DisplayElementMetadata implements IDisplayElementMetadata{
  id: string;
  key: string;
  display: string;
  attributes: Dictionary<any>;
  formSchema: Array<FormElementMetadata | LayoutElementMetadata>;
  formSchemaId: string;
  columns: Array<FormElementMetadata>;
}

const primaryKey = () :FormElementMetadata => {
  var meta = new FormElementMetadata();
  meta.id = nanoid();
  meta.key = "Input";
  meta.display = "表单主键id";
  meta.attributes = {
    "tips": "",
    "label": "表单主键id",
    "type": "hidden",
    "maxlength": 225,
    "clearable": false,
    "placeholder": "请输入",
  };
  meta.dataBinder = {
    "name": nanoid(12),
    "value": "",
    "isSort": true,
    "isFilter": true,
    "bindType": "Int64",
    "uniqueKey": false,
    "primaryKey": true,
    "defaultValue": "",
  };
  meta.validation = [ ];
  return meta;
}

const layoutContainer = (): LayoutElementMetadata => {
  var layout = new LayoutElementMetadata();
  layout.id = nanoid();
  layout.key = "Layout";
  layout.display = "布局";
  layout.attributes = {
    title: nanoid(12),
    icon: "fa fa-fw fa-tasks",
    style: 'container-fluid'
  };

  layout.childes = [];

  return layout;
}

const detailContainer = (): DisplayElementMetadata => {
  var meta = new DisplayElementMetadata();
  meta.key = "FormDetail";
  meta.display = "详情";
  meta.formSchema = [],
  meta.attributes = {
    title: "测试",
    border: true,
    column: 3,
    direction: "horizontal",
    icon: "fa fa-fw fa-wpforms",
  };
  meta.columns = [];
  return meta;
}

const listContainer = (): DisplayElementMetadata => {
  var meta = new DisplayElementMetadata();
  meta.key = "FormList";
  meta.display = "列表";
  meta.formSchema = [],
  meta.attributes = {
    icon: "fa fa-fw fa-table",
    border: false,
    stripe: true,
  };
  meta.columns = [];
  return meta;
}

const App: AppContext = {
  name: 'magicube low code editor',
  version: '1.0.0',
  apiUrl: 'http://localhost:8080/api/',
  loginPath: '/account/login',
  themeMode: 'light',
  uploadUrl: 'http://localhost:8080/api/upload',
  cacheType: CacheType.LOCAL
}

export interface EditorModel{
  title: string;
  formModel: Object;
  formSchema : Array<FormElementMetadata | LayoutElementMetadata>;
  currentWidget: FormElementMetadata | LayoutElementMetadata | DisplayElementMetadata | null;
  listSchema: DisplayElementMetadata,
  detailSchema: DisplayElementMetadata,
}

const ModelContext = ({ title, callback }) => {
  const state: EditorModel = reactive({
    title: title,
    formModel: {},
    formSchema: [],
    currentWidget: null,
    listSchema: listContainer(),
    detailSchema: detailContainer(),
  })

  callback && callback(state);

  const schemaStore = useSchemaStore();

  if(state.formSchema.length == 0){
    if(schemaStore.Mode == SchemaMode.Design){
      state.formSchema.push(primaryKey());
    }else if(schemaStore.Mode == SchemaMode.Layout){
      state.formSchema.push(layoutContainer());
    }    
  }

  const clearModelContext = () => {
    state.formModel = {};
    state.formSchema.splice(0, state.formSchema.length);
  }

  const setCurrentWidget = (block: FormElementMetadata | LayoutElementMetadata | DisplayElementMetadata | null) => {
    state.currentWidget = block;
    state.listSchema.formSchema = state.formSchema;
    state.detailSchema.formSchema = state.formSchema;
    schemaStore.updateSchema(state.formSchema);
  }

  const recursionFind = (collection: Array<any> , predict : (block: FormElementMetadata | LayoutElementMetadata) => Boolean) => {
    var res = collection.map(child=>{
      if(predict(child)) return child;
      if(child.childes && child.childes.length>0) {
        return recursionFind(child.childes, predict);
      }
    });
    return flatMap(res).filter(x => !!x);
  }

  const findAndSetCurrentWidget = (id: string) => {
    if(state.currentWidget && state.currentWidget.id == id) return;

    const _recursion = (childes, id): FormElementMetadata | LayoutElementMetadata => {
      var res = childes.map((child) => {
        if (child.id == id) {
          return child;
        } else if (child.childes) {
          return _recursion(child.childes, id);
        }
      });
      //@ts-ignore
      return flatMap(res).filter(x => !!x)[0];
    }

    let widget = _recursion(state.formSchema, id)
    if (widget) {
      setCurrentWidget(widget)
    }
  }

  const findAndRemoveWidget = (id: string) => {
    const _recursion = (childes, id) => {
      let idx = childes.findIndex(x => x.id == id)
      if (idx > -1) {
        var removed = childes.splice(idx, 1)
        return removed[0];
      }
      const res = childes.map((child) => {
        if (child.childes) {
          return _recursion(child.childes, id)
        }
      });
      if(res.length) return res[0];
    }
    var result = _recursion(state.formSchema, id)
    if (result.dataBinder) delete state.formModel[result.dataBinder.name]
    state.currentWidget = null
    return result;
  }

  const appendFormSchema = (widget: FormElementMetadata | LayoutElementMetadata, idx: number = -1) => {
    if (idx > -1) {
      state.formSchema.splice(idx, 0, widget)
    } else {
      state.formSchema.push(widget)
    }
    if (widget instanceof FormElementMetadata && widget.dataBinder) {
      state.formModel[widget.dataBinder.name] = widget.dataBinder.value
    }
    setCurrentWidget(widget);
  }

  const sortFormSchema = (widget: FormElementMetadata, oidx: number, nidx: number) => {
    state.formSchema.splice(nidx, 0, ...state.formSchema.splice(oidx, 1))
    setCurrentWidget(widget);
  }

  const ensureFormModelInit = (widget: FormElementMetadata) => {
    if (!state.formModel[widget.dataBinder!.name]) {
      state.formModel[widget.dataBinder!.name] = widget.dataBinder!.value;
      if(isNil(state.formModel[widget.dataBinder!.name]) || state.formModel[widget.dataBinder!.name] == ""){
        if(widget.dataBinder!.defaultValue){
          state.formModel[widget.dataBinder!.name] = widget.dataBinder!.defaultValue;
        }
      }
      widget.validation.forEach(item => {
        const rule = find<ValidationRule>(validators, x=>x.serverType == item.provider);
        if(rule && rule.validator) {
          item.rule.validator = rule.validator;
        }
      });
    }
  }

  const addValidation = (validation: WidgetValidation) => {
    if (state.currentWidget && state.currentWidget instanceof FormElementMetadata) {
      state.currentWidget.validation.push(validation);
    }
  }

  const removeValidation = (provider: string) => {
    if (state.currentWidget && state.currentWidget instanceof FormElementMetadata) {
      remove(state.currentWidget.validation, x => x?.rule.name == provider);
    }
  }

  const requireChangeHandler = (v: boolean) => {
    if (v) {
      addValidation({ provider: "Required", rule: {name: "Required"} });
    } else {
      removeValidation("Required");
    }
  }

  return {
    formModel: computed(() => state.formModel),
    formSchema: computed(() => state.formSchema),
    listSchema: computed(() => state.listSchema),
    detailSchema: computed(() => state.detailSchema),
    currentWidget: computed(() => state.currentWidget),
    addValidation,
    recursionFind,
    sortFormSchema,
    removeValidation,
    appendFormSchema,
    setCurrentWidget,
    clearModelContext,
    ensureFormModelInit,
    findAndRemoveWidget,
    requireChangeHandler,
    findAndSetCurrentWidget,
  }
}

export function initEditModelContext({ title, callback }) {
  let modelContext = ModelContext({ title, callback });
  provide(editInjectKey, modelContext);
}

export function initAppContext(callback: (appContext: AppContext) => void) {
  callback && callback(App);
  provide(appInjectKey, readonly(App));
}

export const useEditModel = () => inject<ReturnType<typeof ModelContext>>(editInjectKey)!
export const appContext = () => inject<AppContext>(appInjectKey)!