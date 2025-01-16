<template>
  <div class="flex items-center justify-between">
    <div class="flex justify-start">
      <MenuCollapse class="ml-3" />
    </div>
    <div class="flex justify-end">
      <ToggleTheme  class="mr-3"/>
    </div>
  </div>
</template>

<script setup>
import MenuCollapse from './buttons/MenuCollapse.vue';
import ToggleTheme  from './buttons/ToggleTheme.vue';

</script>
