import { CheckOne } from '@icon-park/vue-next';
import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "Radio";
meta.display = "单选框";
meta.attributes = {
  label: "单选框",
  icon: CheckOne,
  border: false,
  useButton: false,
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