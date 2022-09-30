const modules = import.meta.globEager('./*/index.tsx')

const schemaMapping = {
  "backend": ["layouts", "forms", "widgets"],
  "liquid": ["layouts", "liquids"]
}

const widgetMetas = {}
const widgetFuncs = {}
const components = {}
const widgets = {}

/* 
  这里应该拆分 
    表单： 后台动态生成表单实体
    布局： 生成页面展示的布局，应该包含页面骨架以及可以具体到一个内容快，例如tabs
    页面设计： 由布局和表单widget生成liquid页面设计, widget则由表单动态生成列表、详情、编辑等部件，可以支持自由编辑
*/

Object.keys(modules).forEach((key: string) => {
  const name = key.replace(/\.\/(.*)\/index\.tsx/, '$1');
  components[name] = modules[key]?.default || modules[key];
  if(modules[key]?.widgetMetas){
    Object.assign(widgetMetas, modules[key]?.widgetMetas);
  }
  if(modules[key]?.widgetFuncs){
    Object.assign(widgetFuncs, modules[key]?.widgetFuncs);
  }
  if(modules[key]?.widgets){
    Object.assign(widgets, modules[key]?.widgets);
  }
})

console.log(widgetMetas, widgets, widgetFuncs);
console.log(components);

export { widgetMetas, widgetFuncs, widgets }

export default components
