<template>
  <n-layout has-sider class="h-full w-full">
    <n-layout-sider 
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      :collapsed="appStore.isCollapse"
      class="border-r border-color h-full"
    >
      <AppSider />
    </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <AppHeader class="h-[60px] border-b border-color" />
        <AppTab />
      </n-layout-header>
      <n-layout-content content-style="padding: 12px;">
        <slot />
      </n-layout-content>
      <n-layout-footer 
        class="text-center"
      >
        Copyright © 2025 XiaFan
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { NLayout, NLayoutSider, NLayoutContent, NLayoutHeader, NLayoutFooter } from 'naive-ui';
import AppSider  from '@/layouts/components/AppSider.vue';
import AppHeader from '@/layouts/components/AppHeader.vue';
import AppTab    from '@/layouts/components/AppTab.vue';
import { useAppStore } from '@/store/modules/app';

const appStore = useAppStore();

</script>
