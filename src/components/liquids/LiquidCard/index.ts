import { LiquidElementMetadata } from '@/models/schema';
import { BankCardTwo } from '@icon-park/vue-next';

const meta = new LiquidElementMetadata();

meta.id = "";
meta.key = "LiquidCard";
meta.display = "卡片";
meta.attributes = {
  icon: BankCardTwo,
  title: '这里是标题',
  class: 'bg-primary text-white',
};

export default meta;