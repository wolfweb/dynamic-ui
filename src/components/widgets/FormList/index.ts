import { Table } from '@icon-park/vue-next';
import { DisplayElementMetadata } from '@/models/schema';

const meta = new DisplayElementMetadata();

meta.key = "FormList";
meta.display = "列表";
meta.attributes = {
  icon: Table,
  border: false,
  stripe: true,
  columns: []
};

export default meta