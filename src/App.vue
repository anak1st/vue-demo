<template>
  <NConfigProvider 
    :theme="theme"
    class="h-full w-full"
  >
    <RouterView />
  </NConfigProvider>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterView } from 'vue-router';
import { NConfigProvider, darkTheme } from 'naive-ui';

import { useDark } from '@vueuse/core';
const isDark = useDark();

const theme = computed(() => {
  return isDark.value ? darkTheme : null;
})

</script>
