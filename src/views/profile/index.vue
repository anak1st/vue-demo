<template>
  <div>
    {{ JSON.stringify(userStore.userInfo) }}
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';

const userStore = useUserStore();

</script>