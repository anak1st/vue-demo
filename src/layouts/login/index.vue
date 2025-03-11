<template>
  <n-layout position="absolute">
    <div class="fixed h-[50px] z-50 flex items-center right-2 gap-2">
      <ToggleThemeButton/>
      <FullscreenButton />
    </div>
    <n-layout-content embedded position="absolute">
      <slot />
    </n-layout-content>
    <n-layout-footer bordered position="absolute" class="bottom-0">
      <AppFooter />
    </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutFooter } from 'naive-ui';
import AppFooter         from '@/layouts/components/AppFooter.vue';

import ToggleThemeButton from '@/components/DarkButton.vue';
import FullscreenButton  from '@/components/FullscreenButton.vue';

</script>
