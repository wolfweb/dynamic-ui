import { Detection } from '@icon-park/vue-next';
import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "ColorPicker";
meta.display = "颜色选择器";
meta.attributes = {
  label: "颜色选择器",
  icon: Detection,
  'show-alpha': false,
  'color-format': 'rgb'
};
meta.dataBinder = {
  name: "",
  value: ""
};
meta.validation = [

];

export default meta