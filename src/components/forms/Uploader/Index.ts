import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "Uploader";
meta.display = "文件上传";
meta.attributes = {
  icon: "fa fa-fw fa-cloud-upload",
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