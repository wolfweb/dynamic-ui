import { LiquidElementMetadata } from '@/models/schema';
import { RectangleSmall } from '@icon-park/vue-next';

const meta = new LiquidElementMetadata();

meta.id = "";
meta.key = "LiquidButton";
meta.display = "按钮";
meta.attributes = {
  icon: RectangleSmall,
  title: '标题',
  class: 'bg-primary text-white',
};

export default meta;