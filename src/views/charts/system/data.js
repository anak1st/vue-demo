import { useDark } from "@vueuse/core"
import { fetchSystemStatus } from "@/api/modules/system"


const isDark = useDark()


const colorMap = {
  blue: '#37a2da',
  red: '#9fe6b8',
  yellow: '#fedb5c',
  green: '#fb7293',
  purple: '#e7bcf3',
}


const blue = () => colorMap.blue
const red = () => colorMap.red
const yellow = () => colorMap.yellow
const green = () => colorMap.green
const purple = () => colorMap.purple


const areaStyle = (c) => {
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


export const option = {
  title: {
    text: '系统状态',
  },
  tooltip: {
    trigger: 'axis',
    valueFormatter: (value) => value.toFixed(1)
  },
  legend: {
    data: ['CPU 使用率', '内存使用率'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
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
};


export const updateOption = async (o) => {
  try {
    const res = await fetchSystemStatus(500, 10);
    const cpu_usage = res.cpu_usage.map((item) => item.value);
    console.log(res);
    const memory_usage = res.memory_usage.map((item) => item.value);
    const time = res.cpu_usage.map((item) => item.localtime);

    o.series[0].data = cpu_usage;
    o.series[1].data = memory_usage;
    o.xAxis.data = time;
  } catch (e) {
    throw e;
  }
}

