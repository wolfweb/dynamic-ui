import { nanoid } from 'nanoid';
import { InsertTable } from '@icon-park/vue-next';
import { LayoutElementMetadata } from '@/models/schema';

const meta = new LayoutElementMetadata();
meta.id = "";
meta.key = "Row";
meta.display = "网格";
meta.attributes = {
  icon: InsertTable,
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