import { nanoid } from 'nanoid';
import { LayoutOne } from '@icon-park/vue-next';
import { LayoutElementMetadata } from '@/models/schema';

const meta = new LayoutElementMetadata();
meta.id = "";
meta.key = "Layout";
meta.display = "布局";
meta.attributes = {
  title: nanoid(16),
  icon: LayoutOne,
  style: 'container-fluid'
};

meta.childes = [];

export default meta;