<template>
  <div>
    {{ JSON.stringify(userStore.user) }}
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';

const userStore = useUserStore();

</script>