export default (meta) => {
  const codeBuilder:Array<string> = [];

  codeBuilder.push(`{% if ${meta.attributes.condition} %}`);
  codeBuilder.push("{% render {widgetType}:{entity} %}");
  codeBuilder.push("{% else %}")
  codeBuilder.push("{% render {widgetType}:{entity} %}");
  codeBuilder.push("{% endif %}")

  return codeBuilder.join("");
}