import { LiquidElementMetadata } from '@/models/schema';
import { TitleLevel } from '@icon-park/vue-next';

const meta = new LiquidElementMetadata();

meta.id = "";
meta.key = "Html";
meta.display = "标题";
meta.attributes = {
  icon: TitleLevel,
  level: 1,
  content: '这里是标题',
  tagType: 'h1'
};

export default meta;