import componentLoader from "./index";

import { App } from "vue";
import { Memory } from "@/utils/cache/memory";
import { SchemaMode } from "@/enums/schemaMode";
import { ElementSettings } from "@/models/common";
import { DEFAULT_CACHE_TIME } from "@/utils/cache";
import dynamicComponent from "@/components/dynamicComponent.vue";
import { FormElementMetadata, LayoutElementMetadata, DisplayElementMetadata } from "@/models/schema";
import { isObject, isArray, isBoolean, isString, isNumber, isUndefined, indexOf, } from "lodash-es";

let components : any = null;
const cache = new Memory(DEFAULT_CACHE_TIME);

export const getElementSettingName = (name: string) => {
  for (const k in ElementSettings) {
    if (name.endsWith(k)) return ElementSettings[k];
  }
  return "未知";
};

export const findElementSettings = (meta: FormElementMetadata | LayoutElementMetadata | DisplayElementMetadata) => {
  if (meta && meta.key) {
    return components.widgets[meta.key].filter(
      (x) => x.name.startsWith(meta.key) && x.name.length > meta.key.length
    );
  }
  return [];
};

export const getElementCode = (
  meta: IElementMetadata
) => {
  const elementFunc = `${meta.key}Code`;
  return components.funcs[elementFunc](meta);
};

export const extractProps = (excludes: Array<string>, props: any) => {
  const texts: Array<any> = [];
  for (const key in props) {
    if (excludes && indexOf(excludes, key) > -1) continue;
    const value = props[key];
    if (value === "" || value === undefined) {
      continue;
    }
    if (isObject(value)) {
      texts.push(`:${key}='${JSON.stringify(value)}'`);
      continue;
    }
    if (isArray(value)) {
      texts.push(`:${key}='${JSON.stringify(value)}'`);
      continue;
    }
    if (isBoolean(value)) {
      if (value) {
        texts.push(key);
      } else {
        texts.push(`:${key}='${value}'`);
      }
      continue;
    }
    if (isString(value)) {
      texts.push(`${key}='${value}'`);
      continue;
    }
    if (isNumber(value)) {
      texts.push(`:${key}='${value}'`);
      continue;
    }
    console.log(`key: ${key}, value: ${value} will be ignore!`);
  }
  return texts.join(" ");
};

export const initEditorPlus = (app: App) => {
  for (const k in components.widgets) {
    for (const it in components.widgets[k]) {
      const widget = components.widgets[k][it];
      console.log(`register comp=>${widget.name}`);
      app.component(widget.name!, widget);
    }
  }
  app.component("dynamicComponent", dynamicComponent);
};

export async function getPlugins(mode: SchemaMode = SchemaMode.Form) {
  let plugins = cache.get(mode || SchemaMode.Form);
  if(isUndefined(plugins)){
    components = await componentLoader(mode);
    plugins = components.plugins;
    cache.set(mode, plugins);
    return plugins;
  }else {
    return plugins.value;
  }
}
