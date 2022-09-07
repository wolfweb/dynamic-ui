import { Time } from '@icon-park/vue-next';
import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "TimePicker";
meta.display = "时间选择器";
meta.attributes = {
  label: "时间选择器",
  editable: true,
  clearable: true,
  placeholder: "",
  icon: Time,
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