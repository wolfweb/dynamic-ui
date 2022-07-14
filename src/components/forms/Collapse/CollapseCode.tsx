import { getWidgetCode } from '@/components/component.config'

export default (meta) => {
  const codeBuilder:Array<string> = [];

  codeBuilder.push("<el-collapse ");
  
  codeBuilder.push("</el-collapse>");

  return codeBuilder.join("");
}