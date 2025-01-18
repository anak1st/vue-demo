<template>
  <div class="flex items-center justify-between">
    <div class="flex justify-start">
      <MenuCollapse class="ml-3" />
    </div>
    <div class="flex justify-end">
      <ToggleTheme class="mr-3"/>
      <Fullscreen  class="mr-3"/>
    </div>
  </div>
</template>

<script setup>
import MenuCollapse from './MenuCollapse.vue';
import ToggleTheme  from '@/components/ToggleTheme.vue';
import Fullscreen   from '@/components/Fullscreen.vue';

</script>
