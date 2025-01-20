<template>
  <n-layout position="absolute">
    <div class="fixed right-0 top-3 z-50">
      <ToggleTheme class="mr-3" />
      <Fullscreen  class="mr-3" />
    </div>
    <n-layout-content position="absolute" class="m-2">
      <slot />
    </n-layout-content>
    <n-layout-footer 
      position="absolute"
      class="text-center"
    >
      Copyright © 2025 XiaFan
    </n-layout-footer >
  </n-layout>
</template>

<script setup>
import { NLayout, NLayoutSider, NLayoutContent, NLayoutHeader, NLayoutFooter } from 'naive-ui';
import ToggleTheme from '@/components/ToggleTheme.vue';
import Fullscreen  from '@/components/Fullscreen.vue';
import { useAppStore } from '@/store/modules/app';

const appStore = useAppStore();

</script>
