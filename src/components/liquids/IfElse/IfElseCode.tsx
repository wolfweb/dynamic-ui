import { getElementCode } from '@/components/component.config';

export default (meta) => {
  const codeBuilder:Array<string> = [];

  codeBuilder.push(`{% if ${meta.attributes.condition} %}`);
  meta.attributes.trueChilds.map((child)=> getElementCode(child));
  codeBuilder.push("{% else %}")
  meta.attributes.falseChilds.map((child)=> getElementCode(child));
  codeBuilder.push("{% endif %}")

  return codeBuilder.join("");
}