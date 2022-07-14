import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "RichEditor";
meta.display = "富文本";
meta.attributes = {
  label: "富文本",
  icon: "fa fa-fw fa-indent"
};
meta.dataBinder = {
  name: "",
  value: ""
};
meta.validation = [

];

export default meta