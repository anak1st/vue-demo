<template>
  <div class="flex flex-col h-full">
    <SiderLogo class="flex-none" :style="themeStore.style.header" style="margin-bottom: -5px;" />
    <SiderMenu class="flex-1" />
    <UserInfo  class="flex-none" :isInSider="true" v-if="themeStore.theme.sider.showUserInfo" />
  </div>
</template>

<script setup lang="ts">
import SiderLogo from './SiderLogo.vue'
import SiderMenu from './SiderMenu.vue'
import { useThemeStore } from '@/stores';
import UserInfo from './UserInfo.vue';

const themeStore = useThemeStore();

</script>
