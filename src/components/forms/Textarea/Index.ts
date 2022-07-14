import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "Textarea";
meta.display = "多行输入框";
meta.attributes = {
  rows: 5,
  label: "多行输入",
  required: false,
  minlength: 0,
  maxlength: 255,
  placeholder: "",
  'show-word-limit': false,
  icon: "fa fa-fw fa-terminal"
};
meta.dataBinder = {
  name: "",
  value: ""
};
meta.validation = [

];

export default meta