import { forEach ,set } from 'lodash-es';
import { withInstall }  from '@/utils';

const schemaMapping = {
  "Form": ["forms", "layouts", "widgets"],
  "Liquid": ["liquids", "layouts"],
  "Layout": ["layouts"]
}

const loadForms = async () => await import("./forms/index");
const loadLayouts = async () => await import("./layouts/index");
const loadWidgets = async () => await import("./widgets/index");
const loadLiquids = async () => await import("./liquids/index");

export default async (type) => {
  const folders = schemaMapping[type];
  const components  = {};
  const widgetMetas = {};
  const widgetFuncs = {};
  const widgets = {};

  if(type == 'Form'){
    let module = await loadForms();

    Object.keys(module).forEach((key: string) => {
      set(components,`plugins.forms`, module?.default || module);
      if(module?.widgetMetas){
        Object.assign(widgetMetas, module?.widgetMetas);
      }
      if(module?.widgetFuncs){
        Object.assign(widgetFuncs, module?.widgetFuncs);
      }
      if(module?.widgets){
        Object.assign(widgets, module?.widgets);
        forEach(module?.widgets, items=> forEach(items, widget=> withInstall(widget)));
      }
    });

    module = await loadLayouts();

    Object.keys(module).forEach((key: string) => {
      set(components,`plugins.layouts`, module?.default || module);
      if(module?.widgetMetas){
        Object.assign(widgetMetas, module?.widgetMetas);
      }
      if(module?.widgetFuncs){
        Object.assign(widgetFuncs, module?.widgetFuncs);
      }
      if(module?.widgets){
        Object.assign(widgets, module?.widgets);
        forEach(module?.widgets, items=> forEach(items, widget=> withInstall(widget)));
      }
    });

    module = await loadWidgets();

    Object.keys(module).forEach((key: string) => {
      set(components,`plugins.widgets`, module?.default || module);
      if(module?.widgetMetas){
        Object.assign(widgetMetas, module?.widgetMetas);
      }
      if(module?.widgetFuncs){
        Object.assign(widgetFuncs, module?.widgetFuncs);
      }
      if(module?.widgets){
        Object.assign(widgets, module?.widgets);
        forEach(module?.widgets, items=> forEach(items, widget=> withInstall(widget)));
      }
    });
  }else if(type == 'Liquid'){
    let module = await loadLiquids();

    Object.keys(module).forEach((key: string) => {
      set(components,`plugins.liquids`, module?.default || module);
      if(module?.widgetMetas){
        Object.assign(widgetMetas, module?.widgetMetas);
      }
      if(module?.widgetFuncs){
        Object.assign(widgetFuncs, module?.widgetFuncs);
      }
      if(module?.widgets){
        Object.assign(widgets, module?.widgets);
        forEach(module?.widgets, items=> forEach(items, widget=> withInstall(widget)));
      }
    });

    module = await loadLayouts();

    Object.keys(module).forEach((key: string) => {
      set(components,`plugins.layouts`, module?.default || module);
      if(module?.widgetMetas){
        Object.assign(widgetMetas, module?.widgetMetas);
      }
      if(module?.widgetFuncs){
        Object.assign(widgetFuncs, module?.widgetFuncs);
      }
      if(module?.widgets){
        Object.assign(widgets, module?.widgets);
        forEach(module?.widgets, items=> forEach(items, widget=> withInstall(widget)));
      }
    });
  }else if(type=='Layout'){
    const module = await loadLayouts();

    Object.keys(module).forEach((key: string) => {
      set(components,`plugins.layouts`, module?.default || module);
      if(module?.widgetMetas){
        Object.assign(widgetMetas, module?.widgetMetas);
      }
      if(module?.widgetFuncs){
        Object.assign(widgetFuncs, module?.widgetFuncs);
      }
      if(module?.widgets){
        Object.assign(widgets, module?.widgets);
        forEach(module?.widgets, items=> forEach(items, widget=> withInstall(widget)));
      }
    });
  }else{
    //throw `unknow type => ${type}`;
  }
  
  set(components,'metas' , widgetMetas);
  set(components,'funcs' , widgetFuncs);
  set(components,'widgets' , widgets);

  return components;
}
