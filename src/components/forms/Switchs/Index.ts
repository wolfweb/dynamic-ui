import { SwitchButton } from '@icon-park/vue-next';
import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "Switchs";
meta.display = "开关";
meta.attributes = {
  width: 40,
  label: "开关",
  required: false,
  'active-color': "#409EFF",
  'inactive-color': "#C0CCDA",
  'inactive-text': '',
  'active-text': '',
  icon: SwitchButton
};
meta.dataBinder = {
  name: "",
  value: ""
};
meta.validation = [

];

export default meta