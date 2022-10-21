import { getElementCode } from '@/components/component.config'

export default (meta) => {
  const codeBuilder:Array<string> = []

  codeBuilder.push("<el-form>");

  codeBuilder.push("</el-form>")

  return codeBuilder.join("")
}