<template>
  <n-card>
    <div :style="contentStyle || 'height: 500px;'">
      <VChart :option="option" :theme="isDark ? 'dark' : 'light'" autoresize />
    </div>
    <div class="flex justify-end items-center gap-4 mt-4" v-if="!disableOptions">
      <div> 选择时间 </div>
      <n-select v-model:value="seconds" :options="selectSecondsOption" class=" max-w-30" />
      <div> 选择聚合窗口 </div>
      <n-select v-model:value="aggregate_window" :options="selectAggregateWindowOption" class=" max-w-30" />
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, watch, onMounted } from 'vue';
import { NCard, NSelect, useMessage } from 'naive-ui';
import { useDark } from '@vueuse/core';
import VChart from 'vue-echarts';
import { fetchSystemStatus } from '@/api';
import { useEcharts, type ECOption } from '@/common/useEcharts';
import { ThemeColors } from '@/common/colors';


const { contentStyle, disableOptions } = defineProps<{
  contentStyle?: string;
  disableOptions?: boolean;
}>()


useEcharts();


const message = useMessage();
const isDark = useDark();


const seconds = ref(300);
const aggregate_window = ref(10);


const dimensions = ['time', 'cpu', 'memory'];
const option = ref<ECOption>(createOption(dimensions, []));


const selectSecondsOption = [
  { label: '1 分钟', value: 60 },
  { label: '5 分钟', value: 300 },
  { label: '10 分钟', value: 600 },
  { label: '30 分钟', value: 1800 },
  { label: '1 小时', value: 3600 }
]


const selectAggregateWindowOption = [
  { label: '5 秒', value: 5 },
  { label: '10 秒', value: 10 },
  { label: '30 秒', value: 30 }
]


function createOption(dimensions: string[], source: any): ECOption {
  const colors = [ThemeColors.purple500, ThemeColors.indigo500];

  const createAreaStyle = (c: string) => {
    return {
      color: {
        type: 'linear' as const,
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

  const createSeries = () => {
    const series = [];
    for (let i = 1; i < dimensions.length; i++) {
      series.push({
        type: 'line' as const,
        color: colors[i - 1],
        areaStyle: createAreaStyle(colors[i - 1]),
      });
    }
    return series;
  }

  return {
    title: {
      text: '系统状态',
    },
    dataset: {
      dimensions: dimensions,
      source: source,
    },
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value) => {
        // if value is number, format it to 1 decimal place
        if (typeof value === 'number') {
          return value.toFixed(1);
        } else {
          return String(value);
        }
      },
      textStyle: {
        color: isDark.value ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)",
      },
      backgroundColor: isDark.value ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
    },
    legend: {
      data: dimensions.slice(1),
    },
    grid: {
      left: 25,
      right: 25,
      bottom: 5,
      containLabel: true
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value'
    },
    series: createSeries(),
    backgroundColor: 'transparent',
  }
};


type Data = [string, number, number];
const data = ref<Data[]>([]);
const dataProps = {
  seconds: 300,
  aggregateWindow: 10,
  updataAt: 0,
}


function taskOption() {
  option.value = createOption(dimensions, data.value);
}


async function updateData(seconds: number, aggregateWindow: number) {
  try {
    let justAppend = false;
    let realSeconds = seconds;
    const diff = Date.now() / 1000 - dataProps.updataAt;
    if (dataProps.seconds === seconds && dataProps.aggregateWindow === aggregateWindow && diff < 60) {
      justAppend = true;
      realSeconds = Math.round(Math.min(realSeconds, diff)) + 5; // +5 to avoid lost data due to network delay
    }

    const res = await fetchSystemStatus(realSeconds, aggregateWindow);
    if (!res) {
      message.error('获取系统状态失败');
      return;
    }
    const res_size = res.cpu_usage.length;
    const dataAppend: Data[] = [];
    for (let i = 0; i < res_size; i++) {
      const time = res.cpu_usage[i].localtime.split(' ')[1];
      const timestamp = res.cpu_usage[i].timestamp;
      const cpu = res.cpu_usage[i].value;
      const memory = res.memory_usage[i].value;
      if (timestamp <= dataProps.updataAt) {
        continue;
      }
      if (justAppend && (cpu < 0 || memory < 0)) {
        console.warn('stop at invalid data', cpu, memory);
        break;
      }
      dataAppend.push([time, cpu, memory]);
      dataProps.updataAt = timestamp;
    }
    const trueLength = Math.round(seconds / aggregateWindow);
    data.value = data.value.concat(dataAppend);
    data.value = data.value.slice(-trueLength);

    dataProps.seconds = seconds;
    dataProps.aggregateWindow = aggregateWindow;
  } catch (error) {
    if (error instanceof Error) {
      message.error(error.message);
    } else {
      message.error('获取系统状态失败，原因未知');
    }
  }
}


async function taskUpdateData() {
  await updateData(seconds.value, aggregate_window.value);
}


watch(isDark, () => {
  taskOption();
})


watch(data, () => {
  taskOption();
})


let timer: number | null = null;


async function createTimer() {
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(async () => {
    await taskUpdateData();
  }, aggregate_window.value * 1000);
  await taskUpdateData(); // update data immediately
}

watch(seconds, async () => {
  await updateData(seconds.value, aggregate_window.value);
})

watch(aggregate_window, async () => {
  createTimer();
})

onMounted(async () => {
  createTimer();
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
})


</script>