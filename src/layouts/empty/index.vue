<template>
  <n-layout has-sider class="h-full w-full">
    <n-layout-content content-style="padding: 12px;">
      <slot />
    </n-layout-content>
  </n-layout>
</template>

<script setup>
import { NLayout, NLayoutContent } from 'naive-ui';

</script>
