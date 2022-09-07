import { IndentLeft } from '@icon-park/vue-next';
import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "RichEditor";
meta.display = "富文本";
meta.attributes = {
  label: "富文本",
  icon: IndentLeft,
  placeholder: "请输入"
};
meta.dataBinder = {
  name: "",
  value: ""
};
meta.validation = [

];

export default meta