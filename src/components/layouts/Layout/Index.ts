import { nanoid } from 'nanoid';
import { LayoutElementMetadata } from '@/models/schema';

const meta = new LayoutElementMetadata();
meta.id = "";
meta.key = "Layout";
meta.display = "布局";
meta.attributes = {
  title: nanoid(16),
  icon: "fa fa-fw fa-tasks",
  style: 'container-fluid'
};

meta.childes = [];

export default meta;