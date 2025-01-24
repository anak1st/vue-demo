<template>
  <n-button 
    strong secondary circle type="success"
    @click="appStore.switchCollapse"
  >
    <template #icon>
      <n-icon><MenuIcon /></n-icon>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import { MenuIcon } from '@/components/icons';
import { useAppStore } from '@/stores';


const appStore = useAppStore()

</script>