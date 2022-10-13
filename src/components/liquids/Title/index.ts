import { LiquidElementMetadata } from '@/models/schema';
import { TitleLevel } from '@icon-park/vue-next';

const meta = new LiquidElementMetadata();

meta.id = "";
meta.key = "Title";
meta.display = "标题";
meta.attributes = {
  icon: TitleLevel,
  content: '这里是标题',
  tagType: 'h1',
  binder: ''
};

export default meta;