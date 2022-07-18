import { defineComponent } from 'vue';
import { SchemaMode } from '@/enums/schemaMode';

const components = import.meta.globEager('./*/*.vue');
const modules    = import.meta.globEager('./*/*.ts');
const funcs      = import.meta.globEager('./*/*.tsx');

const widgetMetas = {};
const widgetFuncs = {};
const widgets = {};

Object.keys(components).forEach((key:string) => {
  const name = key.replace(/\.\/(.*)\/\w+\.vue/i, '$1');
  if(!widgets[name]){
    widgets[name] = [];
  }
  widgets[name].push(components[key]?.default || components[key]);
})

Object.keys(modules).forEach((key: string) => {
  const name = key.replace(/\.\/(.*)\/index\.ts/i, '$1');
  widgetMetas[name] = modules[key]?.default || modules[key];
})

Object.keys(funcs).forEach((key: string) => {
  const name = key.replace(/\.\/(.*)\/(\w+)\.tsx/i, '$2');
  widgetFuncs[name] = funcs[key].default;
})

export { widgetMetas, widgets, widgetFuncs}

export default defineComponent({
  name: "liquids",
  label: "liquid布局",
  icon: "Reading",
  metas: widgetMetas,
  schemaModel: SchemaMode.Design
})