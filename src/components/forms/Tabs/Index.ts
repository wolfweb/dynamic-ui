import { FolderMinus } from '@icon-park/vue-next';
import { LayoutElementMetadata } from '@/models/schema';

const meta = new LayoutElementMetadata();
meta.id = "";
meta.key = "Tabs";
meta.display = "标签";
meta.attributes = {
  icon: FolderMinus,
  label: "标签",
  active: "选项 1",
};
meta.childes = [
  {
    display: "选项1",
    name: "group1",
    childes: []
  },
  {
    display: "选项2",
    name: "group2",
    childes: []
  },
];

export default meta