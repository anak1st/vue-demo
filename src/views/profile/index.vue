<template>
  <div>
    {{ JSON.stringify(userStore.userInfo) }}
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();

</script>