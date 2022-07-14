import { nanoid } from 'nanoid';
import { LayoutElementMetadata } from '@/models/schema';

const meta = new LayoutElementMetadata();
meta.id = "";
meta.key = "Row";
meta.display = "网格";
meta.attributes = {
  icon: "fa fa-fw fa-th",
  cols: [
    {
      label: nanoid(12),
      width: null,
      childes: []
    }
  ]
};

meta.childes =[];

export default meta;