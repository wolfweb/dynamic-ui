import { extractProps } from '@/components/component.config'

export default (meta) => {
  const codeBuilder:Array<string> = []

  codeBuilder.push(`<el-form-item :label="${meta.attributes.label}" :required="${meta.attributes.required}" :prop="${meta.dataBinder.name}">`);
  codeBuilder.push('<el-upload ');
  codeBuilder.push(extractProps(["icon"], meta.attributes));
  codeBuilder.push(`v-model="formModel[${meta.dataBinder.name}]" `);
  codeBuilder.push(">");
  codeBuilder.push(`el-icon class="el-icon--upload"><upload-filled /></el-icon>`);
  codeBuilder.push("</el-upload>");

  codeBuilder.push("</el-form-item>");

  return codeBuilder.join("")
}