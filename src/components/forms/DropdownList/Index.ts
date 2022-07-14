import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "DropdownList";
meta.display = "下拉框";
meta.attributes = {
  label: "下拉框",
  clearable: true,
  filterable: false,
  placeholder: "",
  icon: "fa fa-fw fa-angle-down",
  options: [
    {
      label: "选项1",
      value: "option1",
    },
    {
      label: "选项2",
      value: "option2",
    },
    {
      label: "选项3",
      value: "option3",
    }
  ]
};
meta.dataBinder = {
  name: "",
  value: ""
};
meta.validation = [

];

export default meta