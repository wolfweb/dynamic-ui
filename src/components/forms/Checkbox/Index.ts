import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata()
meta.id = "";
meta.key = "Checkbox";
meta.display = "多选框";
meta.attributes = {
  label: "多选框",
  border: false,
  useButton: false,
  icon: "fa fa-fw fa-check-square",
  required: false,
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
    },
  ]
};
meta.dataBinder = {
  name: "",
  value: [],
};
meta.validation = [

];

export default meta