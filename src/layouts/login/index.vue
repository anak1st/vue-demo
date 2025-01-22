<template>
  <n-layout position="absolute">
    <div class="fixed right-0 top-3 z-50">
      <ToggleThemeBtn class="mr-3" />
      <FullscreenBtn  class="mr-3" />
    </div>
    <n-layout-content embedded position="absolute" class="m-2">
      <slot />
    </n-layout-content>
    <n-layout-footer bordered position="absolute" class="bottom-0">
      <AppFooter />
    </n-layout-footer>
  </n-layout>
</template>

<script setup>
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutFooter } from 'naive-ui';
import ToggleThemeBtn from '@/components/ToggleThemeBtn.vue';
import FullscreenBtn  from '@/components/FullscreenBtn.vue';
import AppFooter from '@/layouts/components/AppFooter.vue';
import { useAppStore } from '@/store/modules/app';

const appStore = useAppStore();

</script>
