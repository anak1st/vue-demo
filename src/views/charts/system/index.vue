<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="h-full w-full">
    <n-card class="h-[500px]">
      <v-chart :option="option" :theme="theme" autoresize  />
      <template #action>
        <div class="flex justify-end items-center gap-4 mr-[20px]">
          <div> 选择时间 </div>
          <n-select 
            v-model:value="seconds"  
            :options="selectSecondsOption" 
            size="small"
            class=" max-w-30"
          />
          <div> 选择聚合窗口 </div>
          <n-select 
            v-model:value="aggregate_window" 
            :options="selectAggregateWindowOption"
            size="small" 
            class=" max-w-30"
          />
        </div>
        
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue';
import { NCard, NSelect, useMessage } from 'naive-ui';
import { useDark } from '@vueuse/core';
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart } from 'echarts/charts';
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
// import type { EChartsOption } from 'echarts';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { fetchSystemStatus } from '@/api/modules/system';


const message = useMessage();
const isDark = useDark();


// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);


const colorMap = {
  blue: '#37a2da',
  red: '#9fe6b8',
  yellow: '#fedb5c',
  green: '#fb7293',
  purple: '#e7bcf3',
}


const blue = () => colorMap.blue
const red = () => colorMap.red
// const yellow = () => colorMap.yellow
// const green = () => colorMap.green
// const purple = () => colorMap.purple


const areaStyle = (c: string) => {
  return {
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0.25,
          color: c
        },
        {
          offset: 1,
          color: 'rgba(0, 0, 0, 0)'
        }
      ]
    }
  } 
}


const theme = computed(() => {
  return isDark.value ? "dark" : 'light'; 
})


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const option = ref<any>({
  title: {
    text: '系统状态',
  },
  tooltip: {
    trigger: 'axis',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    valueFormatter: (value: any) => {
      // if value is number, format it to 1 decimal place
      if (typeof value === 'number') {
        return value.toFixed(1);
      } else {
        return String(value);
      }
    }
  },
  legend: {
    data: ['CPU 使用率', '内存使用率'],
  },
  grid: {
    left: 30,
    right: 30,
    bottom: 0,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'CPU 使用率',
      type: 'line',
      stack: 'Total',
      data: [],
      color: blue(),
      areaStyle: areaStyle(blue())
    },
    {
      name: '内存使用率',
      type: 'line',
      stack: 'Total',
      data: [],
      color: red(),
      areaStyle: areaStyle(red())
    }
  ],
  backgroundColor: 'transparent',
});


const updateOption = async (seconds: number, aggregate_window: number) => {
  try {
    const res = await fetchSystemStatus(seconds, aggregate_window);
    if (!res) {
      message.error('获取系统状态失败');
      return;
    }
    const cpu_usage = res.cpu_usage.map((item) => item.value);
    console.log(res);
    const memory_usage = res.memory_usage.map((item) => item.value);
    const time = res.cpu_usage.map((item) => item.localtime.split(' ')[1]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const series = option.value.series as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const xAxis = option.value.xAxis as any;

    series[0].data = cpu_usage;
    series[1].data = memory_usage;
    xAxis.data = time;
  } catch (error) {
    if (error instanceof Error) {
      message.error(error.message);
    } else {
      message.error('获取系统状态失败');
    }
  }
}


const seconds = ref(300);
const aggregate_window = ref(5);


const selectSecondsOption = [
  {
    label: '1 分钟',
    value: 60
  },
  {
    label: '5 分钟',
    value: 300
  },
  {
    label: '10 分钟',
    value: 600
  },
  {
    label: '30 分钟',
    value: 1800
  },
  {
    label: '1 小时',
    value: 3600 
  }
]


const selectAggregateWindowOption = [
  {
    label: '5 秒',
    value: 5
  }, 
  {
    label: '10 秒',
    value: 10 
  },
  {
    label: '30 秒',
    value: 30 
  }
]


const task = async () => {
  await updateOption(seconds.value, Math.min(seconds.value, aggregate_window.value));
}
task();


let timer: number | null = null;

const createTimer = () => {
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(async () => {
    await task();
  }, aggregate_window.value * 1000);
}

watch(seconds, async () => {
  await task();
})
watch(aggregate_window, async () => {
  await task();
  createTimer();
})

createTimer();

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
})


</script>