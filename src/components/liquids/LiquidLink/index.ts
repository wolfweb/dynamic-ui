import { LiquidElementMetadata } from '@/models/schema';
import { Link } from '@icon-park/vue-next';

const meta = new LiquidElementMetadata();

meta.id = "";
meta.key = "LiquidLink";
meta.display = "标题";
meta.attributes = {
  icon: Link,
  content: '这里是连接',
  class: 'btn btn-link'
};

export default meta;