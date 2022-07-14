import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "DateTimePicker";
meta.display = "日期时间选择器";
meta.attributes = {
  label: "日期时间选择器",
  type: "datetime",
  editable: true,
  clearable: true,
  placeholder: "",
  icon: "fa fa-fw fa-calendar",
  'start-placeholder': '',
  'end-placeholder': '',
  align: 'center'
};
meta.dataBinder = {
  name: "",
  value: ""
};
meta.validation = [

];

export default meta