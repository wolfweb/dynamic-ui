import { LiquidElementMetadata } from '@/models/schema';
import { ParagraphAlphabet } from '@icon-park/vue-next';

const meta = new LiquidElementMetadata();

meta.id = "";
meta.key = "LiquidParagraph";
meta.display = "段落";
meta.attributes = {
  icon: ParagraphAlphabet,
  content: '这里是段落',
  align: ''
};

export default meta;