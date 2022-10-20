import { App, markRaw, computed } from 'vue';
import { Emitter } from "mitt";
import { nanoid } from 'nanoid';
import { find, isNil } from 'lodash-es';
import validators from '@/utils/validators';
import { DisplayElementMetadata, EditorModel, FormElementMetadata, SchemaEvent } from "./schema";

import FormDataList from '@/components/forms/FormDataList.vue';
import FormDataDetail from '@/components/forms/FormDataDetail.vue';

const primaryKey = () :FormElementMetadata => {
  let meta = new FormElementMetadata();
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
    "bindType": "System.Int64",
    "uniqueKey": false,
    "primaryKey": true,
    "defaultValue": "",
  };
  meta.validation = [ ];
  return meta;
}

const detailContainer = (): DisplayElementMetadata => {
  let meta = new DisplayElementMetadata();
  meta.key = "FormDetail";
  meta.display = "详情";
  meta.formSchema = [],
  meta.attributes = {
    title: "测试",
    border: true,
    column: 3,
    direction: "horizontal",
  };
  meta.columns = [];
  return meta;
}

const listContainer = (): DisplayElementMetadata => {
  let meta = new DisplayElementMetadata();
  meta.key = "FormList";
  meta.display = "列表";
  meta.formSchema = [],
  meta.attributes = {
    border: false,
    stripe: true,
  };
  meta.columns = [];
  return meta;
}

const formViewAttr = {
  model: {},
  listSchema: listContainer(),
  detailSchema: detailContainer()
}

export const formInitialize = (app : App, editorModel : EditorModel) => {
  const emitter : Emitter<SchemaEvent> = editorModel.emitter;
  editorModel.attributes['formViewAttr'] = formViewAttr;
  
  if(editorModel.viewSchema.length==0) {
    editorModel.viewSchema.push(primaryKey());
  }

  app.component(FormDataList.name, markRaw(FormDataList));
  app.component(FormDataDetail.name, markRaw(FormDataDetail));

  emitter.on("onClear", () => {
    editorModel.attributes.formViewAttr.model = {};
  });

  emitter.on("onSchemaLoading",( obj )=>{
    obj.name = 'form';
    obj.label = '表单';
    obj.extendViews.push({
      label:'详情',
      type: FormDataDetail,
      name: 'detail',
      schema: computed(()=>editorModel.attributes.formViewAttr.detailSchema)
    });

    obj.extendViews.push({
      label:'列表',
      type: FormDataList,
      name: 'list',
      schema: computed(()=>editorModel.attributes.formViewAttr.listSchema)
    });
  });

  emitter.on("onElementAdded", (element) => {
    if (element instanceof FormElementMetadata && element.dataBinder) {
      editorModel.attributes.formViewAttr.model[element.dataBinder.name] = element.dataBinder.value;
      editorModel.attributes.formViewAttr.listSchema.formSchema = editorModel.viewSchema;
      editorModel.attributes.formViewAttr.detailSchema.formSchema = editorModel.viewSchema;
      console.log("onElementAdded");
    }
  });

  emitter.on("onElementLoading", (element)=>{
    if (element instanceof FormElementMetadata){
      ensureFormModelInit(element);
    }
  });
  
  emitter.on("onElementRemoved", (element)=> {
    if (element instanceof FormElementMetadata && element.dataBinder) {
      delete editorModel.attributes.formViewAttr.model[element.dataBinder.name]
    }
  });

  emitter.on("onElementSelected", (element) => {
    console.log("an element selected");
  });
  
  emitter.on("onParseSchema", (schema)=>{
    const attr = editorModel.attributes.formViewAttr;
    schema['listSchema']   = attr.listSchema;
    schema['detailSchema'] = attr.detailSchema ;
  });

  emitter.on("onOtherCommand", (v)=> {
    if(v === 'detail'){
      setTimeout(()=>{
        editorModel.currentElement = editorModel.attributes.formViewAttr.detailSchema;
      }, 0);
    }else if(v === 'list'){
      setTimeout(()=>{
        editorModel.currentElement = editorModel.attributes.formViewAttr.listSchema;
      }, 0);
    }else{
      //editorModel.currentElement = null;
    }
  });

  const ensureFormModelInit = (element: FormElementMetadata) => {
    if (!editorModel.attributes.formViewAttr.model[element.dataBinder!.name]) {
      editorModel.attributes.formViewAttr.model[element.dataBinder!.name] = element.dataBinder!.value;
      if(isNil(editorModel.attributes.formViewAttr.model[element.dataBinder!.name]) || editorModel.attributes.formViewAttr.model[element.dataBinder!.name] == ""){
        if(element.dataBinder!.defaultValue){
          editorModel.attributes.formViewAttr.model[element.dataBinder!.name] = element.dataBinder!.defaultValue;
        }
      }
      element.validation.forEach(item => {
        const rule = find<ValidationRule>(validators, x=>x.serverType == item.provider);
        if(rule && rule.validator) {
          item.rule.validator = rule.validator;
        }
      });
    }
  }
};
