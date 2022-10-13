import { SettingConfig } from '@icon-park/vue-next';
import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "Slider";
meta.display = "滑块";
meta.attributes = {
  min: 0,
  max: 100,
  step: 1,
  label: "滑块",
  'show-stops': false,
  'show-tooltip': true,
  range: false,
  vertical: false,
  icon: SettingConfig
};
meta.dataBinder = {
  name: "",
  value: 0
};
meta.validation = [

];

export default meta