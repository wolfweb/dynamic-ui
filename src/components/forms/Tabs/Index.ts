import { LayoutElementMetadata } from '@/models/schema';

const meta = new LayoutElementMetadata();
meta.id = "";
meta.key = "Tabs";
meta.display = "标签";
meta.attributes = {
  icon: "fa fa-fw fa-folder-o",
  label: "标签",
  active: "选项 1",
  options: [
    {
      label: "选项 1",
    },
    {
      label: "选项 2",
    },
    {
      label: "选项 3",
    },
  ]
};
meta.childes = [

];

export default meta