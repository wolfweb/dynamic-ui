import { Upload } from '@icon-park/vue-next';
import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "Uploader";
meta.display = "文件上传";
meta.attributes = {
  icon: Upload,
  label: "文件上传",
  limit: 5,
  accept: "image/png,image/jpeg,image/gif,image/bmp",
  uploadIcon: "upload-filled",
  required: false,
  multiple: false,
};
meta.dataBinder = {
  name: "",
  value: "",
};
meta.validation = [

];

export default meta