import { ChartHistogram } from '@icon-park/vue-next';
import { DisplayElementMetadata } from '@/models/schema';

const meta = new DisplayElementMetadata();

meta.display = "图表";
meta.attributes = {
  icon: ChartHistogram,
  width: '100%',
  height: '100%',
  options: null,
  backgroundColor: 'rgb(24, 24, 28)'
};


export default meta