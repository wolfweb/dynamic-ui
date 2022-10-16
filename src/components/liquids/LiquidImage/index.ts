import { LiquidElementMetadata } from '@/models/schema';
import { Picture } from '@icon-park/vue-next';

const meta = new LiquidElementMetadata();

meta.id = "";
meta.key = "LiquidImage";
meta.display = "图片";
meta.attributes = {
  icon: Picture,
  class: 'rounded'
};

export default meta;