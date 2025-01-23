<template>
  <div class="h-full w-full">
    <n-card class=" h-[400px] w-[1000px]">
      <v-chart :option="op" :theme="theme" autoresize  />
    </n-card>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';
import { NCard, useMessage } from 'naive-ui';
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
  ToolboxComponent,
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
import VChart, { THEME_KEY } from 'vue-echarts';
import { option, updateOption } from './data';


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
  ToolboxComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);


const op = ref(option);


const theme = computed(() => {
  return isDark.value ? "dark" : 'light'; 
})


const task = async () => {
  try {
    await updateOption(op.value); 
  } catch (error) {
    message.error(error.message); 
  }
}


task();
const timer = setInterval(async () => {
  task();
}, 5 * 1000);


onBeforeUnmount(() => {
  clearInterval(timer);
})


</script>