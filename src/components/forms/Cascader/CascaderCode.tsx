import { extractProps } from '@/components/component.config'

export default (meta) => {
  const codeBuilder:Array<string> = [];
  codeBuilder.push("<el-cascader ");
  codeBuilder.push(extractProps(["icon","options"], meta.attributes));
  codeBuilder.push(">");
  codeBuilder.push("</el-cascader>");
  return codeBuilder.join("");
}