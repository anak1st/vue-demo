<template>
  <div class="mx-3 flex items-center justify-between">
    <div class="flex items-center justify-start">
      <SiderMenuCollapseBtn />
      <AppBreadcrumb class="ml-3" />
    </div>
    <div class="flex items-center justify-end ">
      <ToggleThemeBtn class="mr-3"/>
      <FullscreenBtn  class="mr-3"/>
      <UserInfo />
    </div>
  </div>
</template>

<script setup>
import ToggleThemeBtn from '@/components/ToggleThemeBtn.vue';
import FullscreenBtn  from '@/components/FullscreenBtn.vue';
import AppBreadcrumb  from './AppBreadcrumb.vue';
import UserInfo       from './UserInfo.vue';
import SiderMenuCollapseBtn from './SiderMenuCollapseBtn.vue';

</script>
