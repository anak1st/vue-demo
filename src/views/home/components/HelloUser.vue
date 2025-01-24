<template>
  <n-card>
    <div class="flex items-center">
      <user-avatar />
      <div class="ml-4">
        <h1 class="text-2xl">
          Hello {{ userStore.username }}
        </h1>
        <p class="opacity-80">当前角色：{{ userStore.roles }}</p>
      </div>
    </div>
    <p class="opacity-80 mt-3">
      一个人几乎可以在任何他怀有无限热忱的事情上成功。
    </p>
    <div class="flex justify-end">
      <p class="opacity-80 mt-3">
        —— 查尔斯·史考伯
      </p>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { NCard } from 'naive-ui';
import UserAvatar from '@/components/UserAvatar.vue';
import { useUserStore } from '@/stores';

const userStore = useUserStore();

</script>
