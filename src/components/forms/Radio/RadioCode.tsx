export default (meta) => {
  const codeBuilder:Array<string> = []

  codeBuilder.push(`<el-form-item :label="${meta.attributes.label}" :required="${meta.attributes.required}" :prop="${meta.dataBinder.name}">`);

  codeBuilder.push(`<el-radio-group v-model="formModel[${meta.dataBinder.name}]">`);
  codeBuilder.push(`<template v-for="(item, index) in ${JSON.stringify(meta.attributes.options)}">`);
  if(meta.attributes.useButton){
    codeBuilder.push(`<el-radio-button :label="item.value" :border="${meta.attributes.border}">{{ item.label }}</el-radio-button>`);
  }else{
    codeBuilder.push(`<el-radio :label="item.value" :border="${meta.attributes.border}">{{ item.label }}</el-radio>`);
  }
  codeBuilder.push("</template>");
  codeBuilder.push("</el-radio-group>");

  codeBuilder.push("</el-form-item>");

  return codeBuilder.join("")
}