import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "Cascader";
meta.display = "级联选择器";
meta.attributes = {
  label: "级联选择器",
  icon: "fa fa-fw fa-bars",
  required: false,
  multiple: false,
  clearable: true,
  filterable: true,
  placeholder: "请选择",
  options: [
    {
      label: "选项1",
      value: "option1",
      children:[
        {
          label: "子选项",
          value: "option4",
          children:[]
        }
      ]
    },
    {
      label: "选项2",
      value: "option2",
      children:[]
    }
  ]
};
meta.dataBinder = {
  name: "",
  value: [],
};
meta.validation = [

];

export default meta