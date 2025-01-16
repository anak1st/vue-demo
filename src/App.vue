<template>
  <NConfigProvider class="h-full w-full">
    <RouterView />
  </NConfigProvider>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { NConfigProvider } from 'naive-ui';

</script>
