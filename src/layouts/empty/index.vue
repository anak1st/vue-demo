<template>
  <n-layout position="absolute" >
    <n-layout-content position="absolute" class="m-2">
      <slot />
    </n-layout-content>
  </n-layout>
</template>

<script setup>
import { NLayout, NLayoutContent } from 'naive-ui';

</script>
