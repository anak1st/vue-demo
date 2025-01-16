<template>
  <NButton 
    strong secondary circle type="success"
    @click="appStore.switchCollapse"
  >
    <template #icon>
      <NIcon><MenuIcon /></NIcon>
    </template>
  </NButton>
</template>

<script setup>
import { NButton, NIcon } from 'naive-ui';
import { MenuOpenOutlined as MenuIcon } from '@vicons/material'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
</script>