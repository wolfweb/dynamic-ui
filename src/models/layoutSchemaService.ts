import { App } from 'vue';
import { Emitter } from "mitt";
import { nanoid } from 'nanoid';
import { EditorModel, LayoutElementMetadata, SchemaEvent } from "./schema";

const layoutContainer = (): LayoutElementMetadata => {
  let layout = new LayoutElementMetadata();
  layout.id = nanoid();
  layout.key = "Layout";
  layout.display = "布局";
  layout.attributes = {
    title: nanoid(12),
    style: 'container-fluid'
  };

  layout.childes = [];

  return layout;
}

export const layoutInitialize = (app : App ,editorModel : EditorModel) => {
  const emitter : Emitter<SchemaEvent> = editorModel.emitter;
  
  if(editorModel.viewSchema.length==0) {
    editorModel.viewSchema.push(layoutContainer());
  }

  emitter.on("onClear", () => {
    
  });

  emitter.on("onSchemaLoading",( arr )=>{
    
  });

  emitter.on("onElementAdded", (element) => {
    
  });

  emitter.on("onElementLoading", (element)=>{
    
  });
  
  emitter.on("onElementRemoved", (element)=> {
    
  });

  emitter.on("onElementSelected", (element) => {
    
  });
  
  emitter.on("onParseSchema", (schema)=>{
    
  });
};

