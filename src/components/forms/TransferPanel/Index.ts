import { FormElementMetadata } from '@/models/schema';

const meta = new FormElementMetadata();
meta.id = "";
meta.key = "TransferPanel";
meta.display = "穿梭框";
meta.attributes = {
  label: "穿梭框",
  icon: "fa fa-fw fa-exchange",
  filterable: false,
  options: [
    {
      key: "选项1",
      label: "选项1",
      disbaled: false
    },
    {
      key: "选项2",
      label: "选项2",
      disbaled: false
    },
    {
      key: "选项3",
      label: "选项3",
      disbaled: false
    },
  ]
};
meta.dataBinder = {
  name: "",
  value: ""
};
meta.validation = [
];

export default meta