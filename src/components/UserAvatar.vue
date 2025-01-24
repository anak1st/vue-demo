<template>
  <n-avatar round >
    {{ userStore.username[0] }}
  </n-avatar>
</template>

<script setup lang="ts">
import { NAvatar } from 'naive-ui';
import { useUserStore } from '@/stores'


const userStore = useUserStore();

</script>