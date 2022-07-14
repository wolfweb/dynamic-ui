import { extractProps } from '@/components/component.config'

export default (meta) => {
  const codeBuilder:Array<string> = [];
  codeBuilder.push(`<el-form-item :label="${meta.attributes.label}" :required="${meta.attributes.required}" :prop="${meta.dataBinder.name}">`);

  codeBuilder.push("<el-cascader ");
  codeBuilder.push(extractProps(["icon","options"], meta.attributes));
  codeBuilder.push(">");
  codeBuilder.push("</el-cascader>");

  codeBuilder.push("</el-form-item>");
  return codeBuilder.join("");
}