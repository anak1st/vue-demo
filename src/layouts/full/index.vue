<template>
  <NLayout has-sider class="h-full w-full">
    <NLayoutSider 
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      :collapsed="appStore.isCollapse"
      class="border-r border-color h-full"
    >
      <AppSider />
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader>
        <AppHeader class="h-[60px] border-b border-color" />
        <AppTab />
      </NLayoutHeader>
      <NLayoutContent content-style="padding: 12px;">
        <RouterView />
      </NLayoutContent>
      <NLayoutFooter 
        class="text-center"
      >
        Copyright © 2025 XiaFan
      </NLayoutFooter>
    </NLayout>
  </NLayout>
</template>

<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { NLayout, NLayoutSider, NLayoutContent, NLayoutHeader, NLayoutFooter } from 'naive-ui';
import AppSider  from '@/layouts/components/AppSider.vue';
import AppHeader from '@/layouts/components/AppHeader.vue';
import AppTab    from '@/layouts/components/AppTab.vue';
import { useAppStore } from '@/store/modules/app';

const appStore = useAppStore();

</script>
