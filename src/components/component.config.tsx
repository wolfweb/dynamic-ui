import { App, Component } from "vue";
import { Memory } from "@/utils/cache/memory";
import { SchemaMode } from "@/enums/schemaMode";
import { WidgetSettings } from "@/models/common";
import { DEFAULT_CACHE_TIME } from "@/utils/cache";
import dynamicComponent from "@/components/dynamicComponent.vue";
import { FormElementMetadata, LayoutElementMetadata } from "@/models/schema";
import components, { widgetMetas, widgetFuncs, widgets } from "./index";
import { isObject, isArray, isBoolean, isString, isNumber, isUndefined, indexOf, pickBy, } from "lodash-es";

const cache = new Memory(DEFAULT_CACHE_TIME);

export const getWidgetSettingName = (name: string) => {
  for (var k in WidgetSettings) {
    if (name.endsWith(k)) return WidgetSettings[k];
  }
  return "未知";
};

export const findWidgetSettings = (meta: FormElementMetadata | LayoutElementMetadata) => {
  if (meta && meta.key) {
    return widgets[meta.key].filter(
      (x) => x.name.startsWith(meta.key) && x.name.length > meta.key.length
    );
  }
  return [];
};

export const getWidgetCode = (
  meta: FormElementMetadata | LayoutElementMetadata
) => {
  const widgetFunc = `${meta.key}Code`;
  return widgetFuncs[widgetFunc](meta);
};

export const extractProps = (excludes: Array<string>, props: any) => {
  let texts: Array<any> = [];
  for (let key in props) {
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
  for (var k in widgets) {
    for (var it in widgets[k]) {
      const widget = widgets[k][it];
      app.component(widget.name!, widget);
    }
  }

  app.component("dynamicComponent", dynamicComponent);
};

export function getWidgets(mode: SchemaMode = SchemaMode.Design) {
  let widgets = cache.get(mode || SchemaMode.Design);
  if(isUndefined(widgets)){
    widgets = pickBy(components, (x:any) => x.schemaModel === mode);
    cache.set(mode, widgets);
    return widgets;
  }else {
    return widgets.value;
  }
}
