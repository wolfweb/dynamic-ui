import { LiquidElementMetadata } from '@/models/schema';
import { LoopOnce } from '@icon-park/vue-next';

const meta = new LiquidElementMetadata();

meta.id = "";
meta.key = "Loop";
meta.display = "循环";
meta.attributes = {
  icon: LoopOnce,
  title: '这里是标题',
  class: 'bg-primary text-white',
};

export default meta;