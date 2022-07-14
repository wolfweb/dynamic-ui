import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "Rate";
meta.display = "评分";
meta.attributes = {
  label: "评分",
  max: 5,
  'allow-half': false,
  'show-score': true,
  icon: "fa fa-fw fa-star"
};
meta.dataBinder = {
  name: "",
  value: 0
};
meta.validation = [

];

export default meta