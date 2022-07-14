export default (meta) => {
  const codeBuilder:Array<string> = []
  
  codeBuilder.push(`<el-form-item :label="${meta.attributes.label}" :required="${meta.attributes.required}" :prop="${meta.dataBinder.name}">`);
  codeBuilder.push(`<el-color-picker v-model="formModel[${meta.dataBinder.name}]" :show-alpha="${meta.attributes['show-alpha']}" :color-format="${meta.attributes['color-format']}" />`);
  codeBuilder.push("</el-form-item>");  

  return codeBuilder.join("");
}