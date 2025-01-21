<template>
  <n-avatar round >
    {{ userStore.username[0] }}
  </n-avatar>
</template>

<script setup>
import { NAvatar } from 'naive-ui';
import { useUserStore } from '@/store/modules/user'


const userStore = useUserStore();


</script>