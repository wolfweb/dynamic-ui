import { LiquidElementMetadata } from '@/models/schema';
import { RightBranchTwo } from '@icon-park/vue-next';

const meta = new LiquidElementMetadata();

meta.id = "";
meta.key = "IfElse";
meta.display = "IfElse";
meta.attributes = {
  icon: RightBranchTwo,
  condition: '',
  trueChilds: [],
  falseChilds: []
};

export default meta;