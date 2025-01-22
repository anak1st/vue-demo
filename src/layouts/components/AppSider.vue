<template>
  <n-layout>
    <n-layout-header bordered >
      <SiderLogo class="h-[50px]" />
    </n-layout-header>
    <n-layout-content>
      <SiderMenu />
    </n-layout-content>
  </n-layout>
</template>

<script setup>
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutFooter } from 'naive-ui';
import SiderLogo from '@/layouts/components/SiderLogo.vue'
import SiderMenu from '@/layouts/components/SiderMenu.vue'

</script>
