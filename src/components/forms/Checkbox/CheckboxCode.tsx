export default (meta) => {
  const codeBuilder:Array<string> = [];
  codeBuilder.push(`<el-form-item :label="${meta.attributes.label}" :required="${meta.attributes.required}" :prop="${meta.dataBinder.name}">`);

  codeBuilder.push(`<el-checkbox-group v-model="formModel[${meta.dataBinder.name}]">`);
  codeBuilder.push(`<template v-for="(item, index) in ${JSON.stringify(meta.attributes.options)}">`);
  if(meta.attributes.useButton){
    codeBuilder.push(`<el-checkbox-button :label="item.value" :border="${meta.attributes.border}">{{ item.label }}</el-checkbox-button>`);
  }else{
    codeBuilder.push(`<el-checkbox :label="item.value" :border="${meta.attributes.border}">{{ item.label }}</el-checkbox>`);
  }
  codeBuilder.push("</template>");
  codeBuilder.push("</el-checkbox-group>");

  codeBuilder.push("</el-form-item>");

  return codeBuilder.join("");
}