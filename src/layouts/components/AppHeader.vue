<template>
  <div class="px-3 flex items-center justify-between ">
    <div class="flex items-center justify-start gap-2">
      <SiderMenuCollapseButton />
      <AppBreadcrumb v-if="themeStore.theme.header.showBreadcrumbs" />
      <AppTab v-if="themeStore.theme.header.showTabs" />
    </div>
    
    <div class="flex items-center justify-end gap-2">
      <ToggleThemeButton/>
      <FullscreenButton />
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBreadcrumb  from './AppBreadcrumb.vue';
import AppTab         from './AppTab.vue';
import UserInfo       from './UserInfo.vue';
import SiderMenuCollapseButton from './SiderMenuCollapseButton.vue';

import ToggleThemeButton from '@/components/DarkButton.vue';
import FullscreenButton  from '@/components/FullscreenButton.vue';

import { useThemeStore } from '@/stores';


const themeStore = useThemeStore();


</script>
