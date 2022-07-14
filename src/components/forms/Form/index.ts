import { LayoutElementMetadata } from '@/models/schema';

const meta = new LayoutElementMetadata();
meta.id = "";
meta.key = "Form";
meta.display = "表单";
meta.attributes = {
  icon: "fa fa-fw fa-wpforms",
  inline: false,
  size: "large",
  "label-position": "right",
  "label-width": 100,
  "label-suffix": "：",
};
meta.childes = [

];

export default meta