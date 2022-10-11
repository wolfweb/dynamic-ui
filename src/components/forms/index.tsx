import { defineComponent } from 'vue';
import { SchemaMode } from '@/enums/schemaMode';

const components = import.meta.glob('./*/*.vue', { eager: true });
const modules    = import.meta.glob('./*/*.ts', { eager: true });
const funcs      = import.meta.glob('./*/*.tsx', { eager: true });

const widgetMetas = {};
const widgetFuncs = {};
const widgets = {};

Object.keys(components).forEach((key:string) => {
  const name = key.replace(/\.\/(.*)\/\w+\.vue/i, '$1');
  if(!widgets[name]){
    widgets[name] = [];
  }
  // @ts-ignore
  widgets[name].push(components[key]?.default || components[key]);
})

Object.keys(modules).forEach((key: string) => {
  const name = key.replace(/\.\/(.*)\/index\.ts/i, '$1');
  // @ts-ignore
  widgetMetas[name] = modules[key]?.default || modules[key];
})

Object.keys(funcs).forEach((key: string) => {
  const name = key.replace(/\.\/(.*)\/(\w+)\.tsx/i, '$2');
  // @ts-ignore
  widgetFuncs[name] = funcs[key].default;
})

export { widgetMetas, widgets, widgetFuncs}

export default defineComponent({
  name: "forms",
  label: "表单",
  icon: "Document",
  metas: widgetMetas,
  schemaModel: SchemaMode.Form
})