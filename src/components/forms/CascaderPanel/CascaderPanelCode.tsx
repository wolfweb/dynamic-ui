import { extractProps } from '@/components/component.config'

export default (meta) => {
  const codeBuilder:Array<string> = [];
  codeBuilder.push(`<el-form-item :label="${meta.attributes.label}" :required="${meta.attributes.required}" :prop="${meta.dataBinder.name}">`);

  codeBuilder.push("<el-cascader-panel  ");
  codeBuilder.push(extractProps(["icon","options", "multiple"], meta.attributes));
  codeBuilder.push(`:props='{multiple:${meta.attributes.multiple}}'`);
  codeBuilder.push(">");
  codeBuilder.push("</el-cascader-panel>");

  codeBuilder.push("</el-form-item>");

  return codeBuilder.join("");
}