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

<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutHeader } from 'naive-ui';
import SiderLogo from './SiderLogo.vue'
import SiderMenu from './SiderMenu.vue'

</script>
