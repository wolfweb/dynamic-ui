import componentLoader from "./index";

import { App } from "vue";
import { Memory } from "@/utils/cache/memory";
import { SchemaMode } from "@/enums/schemaMode";
import { WidgetSettings } from "@/models/common";
import { DEFAULT_CACHE_TIME } from "@/utils/cache";
import dynamicComponent from "@/components/dynamicComponent.vue";
import { FormElementMetadata, LayoutElementMetadata, DisplayElementMetadata } from "@/models/schema";
import { isObject, isArray, isBoolean, isString, isNumber, isUndefined, indexOf, } from "lodash-es";

let components : any = null;
const cache = new Memory(DEFAULT_CACHE_TIME);

export const getWidgetSettingName = (name: string) => {
  for (const k in WidgetSettings) {
    if (name.endsWith(k)) return WidgetSettings[k];
  }
  return "未知";
};

export const findWidgetSettings = (meta: FormElementMetadata | LayoutElementMetadata | DisplayElementMetadata) => {
  if (meta && meta.key) {
    return components.widgets[meta.key].filter(
      (x) => x.name.startsWith(meta.key) && x.name.length > meta.key.length
    );
  }
  return [];
};

export const getWidgetCode = (
  meta: FormElementMetadata | LayoutElementMetadata
) => {
  const widgetFunc = `${meta.key}Code`;
  return components.funcs[widgetFunc](meta);
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
