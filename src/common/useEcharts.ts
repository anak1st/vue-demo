import * as echarts from 'echarts/core'
import { 
  LineChart,
  PieChart,
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// types
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption
} from 'echarts/charts';
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  LegendComponentOption
} from 'echarts/components';
import type {
  ComposeOption,
} from 'echarts/core';
import type { EChartsOption } from 'echarts';



export function useEcharts() {
  echarts.use([
    LineChart,
    PieChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
  ]);
}


export type ECOption = EChartsOption;
// export type ECOption = ComposeOption<
//   | BarSeriesOption
//   | LineSeriesOption
//   | TitleComponentOption
//   | TooltipComponentOption
//   | GridComponentOption
//   | DatasetComponentOption
//   | LegendComponentOption
// >;