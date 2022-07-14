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
  icon: "fa fa-fw fa-sliders"
};
meta.dataBinder = {
  name: "",
  value: ""
};
meta.validation = [

];

export default meta