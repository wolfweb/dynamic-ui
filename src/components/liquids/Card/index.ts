import { LiquidElementMetadata } from '@/models/schema';
import { BankCardTwo } from '@icon-park/vue-next';

const meta = new LiquidElementMetadata();

meta.id = "";
meta.key = "Card";
meta.display = "卡片视图";
meta.attributes = {
  icon: BankCardTwo,
  title: '这里是标题',
  
};

export default meta;