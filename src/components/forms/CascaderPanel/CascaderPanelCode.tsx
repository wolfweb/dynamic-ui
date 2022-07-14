import { extractProps } from '@/components/component.config'

export default (meta) => {
  const codeBuilder:Array<string> = [];

  codeBuilder.push("<el-cascader-panel  ");
  codeBuilder.push(extractProps(["icon","options", "multiple"], meta.attributes));
  codeBuilder.push(`:props='{multiple:${meta.attributes.multiple}}'`);
  codeBuilder.push(">");
  codeBuilder.push("</el-cascader-panel>");

  return codeBuilder.join("");
}