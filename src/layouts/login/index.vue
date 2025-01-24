<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <n-layout position="absolute">
    <div class="fixed flex items-center right-0 h-[50px] mr-3 z-50">
      <ToggleThemeButton class="mr-3" />
      <FullscreenButton  />
    </div>
    <n-layout-content embedded position="absolute" class="m-2">
      <slot />
    </n-layout-content>
    <n-layout-footer bordered position="absolute" class="bottom-0">
      <AppFooter />
    </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutFooter } from 'naive-ui';
import ToggleThemeButton from '@/components/ToggleThemeButton.vue';
import FullscreenButton  from '@/components/FullscreenButton.vue';
import AppFooter         from '@/components/AppFooter.vue';

</script>
