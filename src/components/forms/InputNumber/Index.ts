import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "InputNumber";
meta.display = "数字输入框";
meta.attributes = {
  min: 0,
  max: 100,
  step: 1,
  label: "数字输入框",
  'step-strictly': false,
  precision: 0,
  controls: true,
  'controls-position': 'right',
  placeholder: '',
  icon: "fa fa-fw fa-plus"
};
meta.dataBinder = {
  name: "",
  value: 0
};
meta.validation = [

];

export default meta