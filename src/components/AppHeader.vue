<template>
  <div class="mx-3 flex items-center justify-between">
    <div class="flex items-center justify-start gap-2">
      <SiderMenuCollapseButton />
      <AppBreadcrumb />
    </div>
    <div class="flex items-center justify-end gap-2">
      <ToggleThemeButton/>
      <FullscreenButton />
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import ToggleThemeButton from './ToggleThemeButton.vue';
import FullscreenButton  from './FullscreenButton.vue';
import AppBreadcrumb  from './AppBreadcrumb.vue';
import UserInfo       from './UserInfo.vue';
import SiderMenuCollapseButton from './SiderMenuCollapseButton.vue';


</script>
