import { DisplayElementMetadata } from '@/models/schema';

const meta = new DisplayElementMetadata();

meta.key = "FormList";
meta.display = "列表";
meta.attributes = {
  icon: "fa fa-fw fa-table",
  border: false,
  stripe: true,
};

meta.columns = [];

export default meta