<template>
  <div class="flex"> 
    <n-card>
      <JsonPretty :data="userStore.user" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { NCard } from 'naive-ui';
import JsonPretty from '@/components/JsonPretty.vue';
import { useUserStore } from '@/stores';

const userStore = useUserStore();

</script>