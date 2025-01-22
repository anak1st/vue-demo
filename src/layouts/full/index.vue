<template>
  <n-layout has-sider class="h-full w-full">
    <n-layout-sider 
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      :collapsed="appStore.isCollapse"
      bordered
      class="h-full"
    >
      <AppSider />
    </n-layout-sider>
    <n-layout class="flex flex-col relative">
      <n-layout-header bordered >
        <AppHeader class="h-[60px]" />
      </n-layout-header>
      <!-- min-height := 100% - 60px (header height) - 25px (footer height) - [2~3]px (2 lines) -->
      <n-layout embedded style="min-height: calc(100% - 60px - 25px - 3px);">
        <n-layout-header bordered>
          <AppTab />
        </n-layout-header>
        <n-layout-content embedded class="m-2">
          <slot />
        </n-layout-content>
      </n-layout>
      <n-layout-footer bordered>
        <AppFooter />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { NLayout, NLayoutSider, NLayoutContent, NLayoutHeader, NLayoutFooter } from 'naive-ui';
import AppSider  from '@/layouts/components/AppSider.vue';
import AppHeader from '@/layouts/components/AppHeader.vue';
import AppTab    from '@/layouts/components/AppTab.vue';
import AppFooter from '@/layouts/components/AppFooter.vue';
import { useAppStore } from '@/store/modules/app';

const appStore = useAppStore();


</script>
