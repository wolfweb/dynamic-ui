import type { InjectionKey } from 'vue';

import mitt, { Emitter } from "mitt";
import { CacheType } from '@/enums/cache';
import { useSchemaStore } from '@/store/modules/schemaStore';
import { flatMap, remove } from 'lodash-es';
import { reactive, inject, provide, readonly, computed } from 'vue';

const editInjectKey: InjectionKey<ReturnType<typeof ModelContext>> = Symbol();
const appInjectKey: InjectionKey<AppContext> = Symbol();

export class FormElementMetadata implements IFormElementMetadata {
  id: string;
  key: string;
  display: string;
  attributes: Dictionary<any>;
  dataBinder: Nullable<FormElementDataBinder>;
  validation: Array<FormElementValidation>;
  childes?: Array<IFormElementChildGroupMetadata>;
}

export class LayoutElementMetadata implements ILayoutElementMetadata {
  id: string;
  key: string;
  display: string;
  attributes: Dictionary<any>;
  childes: Array<IFormElementChildGroupMetadata>;
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

export class LiquidElementMetadata implements ILiquidElementMetadata{
  id: string;
  key: string;
  display: string;
  attributes: Dictionary<any>;
  childes?: Array<any> = [];
}

type MainTablAttr = {
  name: String,
  label: String,
  extendViews: Array<any>
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

export type SchemaEvent = {
  onClear: void,
  onParseSchema: Object,
  onSchemaLoading: MainTablAttr,
  onElementAdded: IElementMetadata,
  onElementLoading: IElementMetadata, 
  onElementRemoved: IElementMetadata,
  onElementSelected: IElementMetadata,

  onOtherCommand: any,
}

export interface EditorModel {
  title: string;
  viewSchema : Array<IElementMetadata>;
  currentElement: IElementMetadata | null;
  emitter: Emitter<SchemaEvent>;
  attributes: Record<string, any>;
}

const ModelContext = ({ title, callback }) => {
  const emitter : Emitter<SchemaEvent> = mitt<SchemaEvent>();

  const state: EditorModel = reactive({
    title: title,
    viewSchema: [],
    emitter: emitter,
    currentElement: null,
    attributes: { },
  });

  callback && callback(state);

  const schemaStore = useSchemaStore();

  const clearModelContext = () => {
    state.viewSchema.splice(0, state.viewSchema.length);
    emitter.emit("onClear");
  }

  const setCurrentElement = (block: IElementMetadata | null) => {
    state.currentElement = block;
    emitter.emit("onElementSelected", block);
    schemaStore.updateSchema(state.viewSchema);
  }

  const findAndSetCurrentElement = (id: string) => {
    if(state.currentElement && state.currentElement.id == id) return;

    const _recursion = (childes, id): IElementMetadata => {
      let res = childes.map((child) => {
        if (child.id == id) {
          return child;
        } else if (child.childes) {
          return _recursion(child.childes, id);
        }
      });
      //@ts-ignore
      return flatMap(res).filter(x => !!x)[0];
    }

    let element = _recursion(state.viewSchema, id)
    if (element) {
      setCurrentElement(element);
      emitter.emit("onElementLoading", element);
    }
  }

  const findAndRemoveElement = (id: string) => {
    const _recursion = (childes, id) => {
      let idx = childes.findIndex(x => x.id == id)
      if (idx > -1) {
        let removed = childes.splice(idx, 1)
        return removed[0];
      }
      const res = childes.map((child) => {
        if (child.childes) {
          return _recursion(child.childes, id)
        }
      });
      if(res.length) return res[0];
    }
    let result = _recursion(state.viewSchema, id);

    emitter.emit("onElementRemoved", result);

    state.currentElement = null
    return result;
  }

  const appendElementToSchema = (element: IElementMetadata, idx: number = -1) => {
    if (idx > -1) {
      state.viewSchema.splice(idx, 0, element)
    } else {
      state.viewSchema.push(element)
    }
    emitter.emit("onElementAdded", element);
    setCurrentElement(element);
  }

  const sortViewSchema = (element: IElementMetadata, oidx: number, nidx: number) => {
    state.viewSchema.splice(nidx, 0, ...state.viewSchema.splice(oidx, 1))
    setCurrentElement(element);
  }

  const addValidation = (validation: FormElementValidation) => {
    if (state.currentElement && state.currentElement instanceof FormElementMetadata) {
      state.currentElement.validation.push(validation);
    }
  }

  const removeValidation = ( predict : (validation: FormElementValidation) => Boolean) => {
    if (state.currentElement && state.currentElement instanceof FormElementMetadata) {
      remove(state.currentElement.validation, x => predict(x));
    }
  }

  const requireChangeHandler = (v: boolean) => {
    if (v) {
      addValidation({ provider: "Required", rule: {name: "Required"} });
    } else {
      removeValidation(validation=> validation.provider === "Required");
    }
  }

  return {
    editerModel: state,
    viewSchema: computed({
      get: () => state.viewSchema, 
      set: (v) => {  }
    }),
    currentElement: computed(() => state.currentElement),
    addValidation,
    sortViewSchema,
    removeValidation,
    setCurrentElement,
    clearModelContext,
    findAndRemoveElement,
    requireChangeHandler,
    appendElementToSchema,
    findAndSetCurrentElement,
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