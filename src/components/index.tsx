import { forEach ,set } from 'lodash-es';
import { withInstall }  from '@/utils';

const schemaMapping = {
  "Form": ["forms", "layouts", "widgets"],
  "Liquid": ["liquids", "layouts"],
  "Layout": ["layouts"]
}

export default async (type) => {
  const folders = schemaMapping[type];
  const components  = {};
  const widgetMetas = {};
  const widgetFuncs = {};
  const widgets = {};
  
  for(var i in folders){
    const it = folders[i];
    const path= `./${it}/index.tsx`;
    const module = await import(/* @vite-ignore */path);
    Object.keys(module).forEach((key: string) => {
      set(components,`plugins.${it}`, module?.default || module);
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
  }

  set(components,'metas' , widgetMetas);
  set(components,'funcs' , widgetFuncs);
  set(components,'widgets' , widgets);

  return components;
}
