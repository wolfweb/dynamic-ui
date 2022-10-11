import { extractProps } from '@/components/component.config';

export default (meta) => {
  const codeBuilder:Array<string> = [];
  codeBuilder.push(`<el-form-item :label="${meta.attributes.label}">`);

  codeBuilder.push(`<el-collapse v-model="${meta.attributes.active}"`);
  codeBuilder.push(extractProps(["icon","active","label"], meta.attributes));
  codeBuilder.push(">");

  

  codeBuilder.push("</el-collapse>");

  codeBuilder.push("</el-form-item>");

  return codeBuilder.join("");
}