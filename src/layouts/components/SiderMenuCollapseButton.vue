<template>
  <n-button 
    circle type="primary" ghost bordered
    @click="() => themeStore.switchCollapse()"
  >
    <template #icon>
      <n-icon>
        <Icon name="menu" />
      </n-icon>
    </template>
  </n-button>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import Icon from '@/components/Icon.vue';
import { useThemeStore } from '@/stores';


const themeStore = useThemeStore()

</script>