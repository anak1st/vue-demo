<template>
  <div class="mx-3 flex items-center justify-between">
    <div class="flex justify-start">
      <MenuCollapseBtn />
    </div>
    <!-- <slot /> -->
    <div class="flex justify-end ">
      <ToggleThemeBtn class="mr-3"/>
      <FullscreenBtn  class="mr-3"/>
      <UserInfo />
    </div>
  </div>
</template>

<script setup>
import ToggleThemeBtn  from '@/components/ToggleThemeBtn.vue';
import FullscreenBtn   from '@/components/FullscreenBtn.vue';
import MenuCollapseBtn from './MenuCollapseBtn.vue';
import UserInfo        from './UserInfo.vue';

</script>
