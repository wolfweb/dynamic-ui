import { LayoutElementMetadata } from '@/models/schema';

const meta = new LayoutElementMetadata();
meta.id = "";
meta.key = "Collapse";
meta.display = "折叠面板";
meta.attributes = {
  label: "折叠面板",
  icon: "fa fa-fw fa-compress",
  accordion: false,
  active: ''
};
meta.childes = [
  {
    display: "组一",
    name: "group1",
    childes: []
  },
  {
    display: "组二",
    name: "group2",
    childes: []
  },
];

export default meta