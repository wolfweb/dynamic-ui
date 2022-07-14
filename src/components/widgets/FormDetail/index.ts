import { DisplayElementMetadata } from '@/models/schema';

const meta = new DisplayElementMetadata();

meta.key = "FormDetail";
meta.display = "详情";
meta.attributes = {
  title: "",
  border: true,
  column: 3,
  direction: "horizontal",
  icon: "fa fa-fw fa-wpforms",
};

meta.columns = [];

export default meta