import { CodeOne } from '@icon-park/vue-next';
import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "Input";
meta.display = "单行输入框";
meta.attributes = {
  tips: "",
  label: "输入框",
  required: false,
  type: "text",
  maxlength: 225,
  placeholder: "请输入",
  icon: CodeOne,
  clearable: false,
  'show-password': false
};
meta.dataBinder = {
  name: "",
  value: "",
  defaultValue: "",
  uniqueKey: false,
  isFilter: false,
  isSort: false,
};
meta.validation = [

];

export default meta