import { extractProps } from '@/components/component.config'

export default (meta) => {
  const codeBuilder:Array<string> = []

  if(meta.attributes.type !== "hidden"){
    codeBuilder.push(`<el-form-item :label="${meta.attributes.label}" :required="${meta.attributes.required}" :prop="${meta.dataBinder.name}">`);
  }

  codeBuilder.push("<el-input ")
  codeBuilder.push(extractProps(["icon","options"], meta.attributes))
  codeBuilder.push(">")
  codeBuilder.push("</el-input>")  

  if(meta.attributes.type !== "hidden"){
    codeBuilder.push(`</el-form-item>`);
  }

  return codeBuilder.join("")
}