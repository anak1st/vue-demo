<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col items-center gap-1" @click="themeStore.setLayout('simple')">
      <div class="flex">
        <n-skeleton :width="30" :height="90" />
        <div class="ml-1">
          <n-skeleton :width="120" :height="90" />
        </div>
      </div>
      <n-button :type="themeStore.theme.layout === 'simple' ? 'primary' : undefined" >
        简约
      </n-button>
    </div>
    <div class="flex flex-col items-center gap-1" @click="themeStore.setLayout('normal')">
      <div class="flex">
        <n-skeleton :width="30" :height="90" />
        <div class="ml-1">
          <n-skeleton :width="120" :height="15" />
          <n-skeleton class="mt-1" :width="120" :height="71" />
        </div>
      </div>
      <n-button :type="themeStore.theme.layout === 'normal' ? 'primary' : undefined" >
        通用
      </n-button>
    </div>
    <div class="flex flex-col items-center gap-1" @click="themeStore.setLayout('full')">
      <div class="flex">
        <n-skeleton :width="30" :height="90" />
        <div class="ml-1">
          <div class="flex">
            <n-skeleton :width="70" :height="10" />
            <n-skeleton class="ml-1" :width="46" :height="10" />
          </div>
          <n-skeleton class="mt-1" :width="120" :height="10" />
          <n-skeleton class="mt-1" :width="120" :height="62" />
        </div>
      </div>
      <n-button :type="themeStore.theme.layout === 'full' ? 'primary' : undefined" >
        全面
      </n-button>
    </div>
    <div class="flex flex-col items-center gap-1" @click="themeStore.setLayout('default')">
      <div class="flex">
        <n-skeleton :width="30" :height="90" />
        <div class="ml-1">
          <n-skeleton :width="120" :height="10" />
          <n-skeleton class="mt-1" :width="120" :height="10" />
          <n-skeleton class="mt-1" :width="120" :height="62" />
        </div>
      </div>
      <n-button :type="themeStore.theme.layout === 'default' ? 'primary' : undefined" >
        默认
      </n-button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { NButton, NSkeleton } from 'naive-ui';
import { useThemeStore } from '@/stores';

const themeStore = useThemeStore();

</script>