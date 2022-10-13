import { getElementCode } from '@/components/component.config'
export default (meta) => {
  const codeBuilder: Array<string> = [];
  codeBuilder.push('<div class="row">');
  for (let i = 0; i < meta.attributes.cols.length; i++) {
    const col = meta.attributes.cols[i];
    const style = col.width ? `col-${col.width}` : 'col';
    codeBuilder.push(`<div class="${style}">`);
    if (col[i]?.childes.length > 0) {
      for (let j = 0; j < meta.attributes.cols.sections[i].childes.length; j++) {
        const key = meta.attributes.cols.sections[i].childes[j], child = meta.childes.find(x => x.id == key);
        codeBuilder.push(getElementCode(child));
      }
    } else {
      codeBuilder.push(`{% rendersection ${col.label} %}`);
    }
    codeBuilder.push('</div>');
  }
  codeBuilder.push('</div>');
  return codeBuilder.join("");
}