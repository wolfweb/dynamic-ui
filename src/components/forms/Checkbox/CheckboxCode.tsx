import { getWidgetCode } from '@/components/component.config'

export default (meta) => {
  const codeBuilder:Array<string> = [];

  codeBuilder.push("<el-checkbox-group ");
  
  codeBuilder.push("</el-checkbox-group>");

  return codeBuilder.join("");
}