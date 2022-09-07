import { ChartHistogram } from '@icon-park/vue-next';
import { DisplayElementMetadata } from '@/models/schema';

const meta = new DisplayElementMetadata();

meta.display = "图表";
meta.attributes = {
  icon: ChartHistogram,
};


export default meta