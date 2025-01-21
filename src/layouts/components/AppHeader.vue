<template>
  <div class="flex items-center justify-between">
    <div class="flex justify-start">
      <MenuCollapseBtn class="ml-3" />
    </div>
    <!-- <slot /> -->
    <div class="flex justify-end mr-3">
      <ToggleThemeBtn class="mr-3"/>
      <FullscreenBtn  class="mr-3"/>
      <UserInfo class="" />
    </div>
  </div>
</template>

<script setup>
import ToggleThemeBtn  from '@/components/ToggleThemeBtn.vue';
import FullscreenBtn   from '@/components/FullscreenBtn.vue';
import MenuCollapseBtn from './MenuCollapseBtn.vue';
import UserInfo        from './UserInfo.vue';

</script>
