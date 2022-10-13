import { LiquidElementMetadata } from '@/models/schema';
import { Link } from '@icon-park/vue-next';

const meta = new LiquidElementMetadata();

meta.id = "";
meta.key = "Link";
meta.display = "标题";
meta.attributes = {
  icon: Link,
  content: '这里是标题',
  class: 'btn btn-link'
};

export default meta;