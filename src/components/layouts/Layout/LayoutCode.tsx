import { getElementCode } from '@/components/component.config'
export default (meta) => {
  const codeBuilder:Array<string> = [], childTexts= meta.childes.map((child)=> getElementCode(child))
  codeBuilder.push(`<div class="${meta.attributes.style}">`)
  codeBuilder.push(childTexts)
  codeBuilder.push('</div>')
  return codeBuilder.join("")
}