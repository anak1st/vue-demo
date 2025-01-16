<template>
  <NLayout has-sider>
    <NLayoutSider :width="220" >
      <AppBar />
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader>Header</NLayoutHeader>
      <NLayoutContent content-style="padding: 24px;">
        <RouterView />
      </NLayoutContent>
      <NLayoutFooter>Copyright © 2025 XiaFan</NLayoutFooter>
    </NLayout>
  </NLayout>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { NLayout, NLayoutSider, NLayoutContent, NLayoutHeader, NLayoutFooter } from 'naive-ui';
import AppBar from '@/layouts/components/AppBar.vue';
import { useAppStore } from '@/store/modules/app';

const appStore = useAppStore();

</script>