<template>
  <n-card>
    <div class="flex items-center">
      <n-avatar round :size="80" src="/avatar.jpg" />
      <div class="ml-4">
        <h1 class="text-2xl">
          Hello {{ userStore.username }}
        </h1>
        <p class="opacity-80">当前角色：{{ userStore.role }}</p>
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

<script setup>
import { NCard, NAvatar } from 'naive-ui';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();

</script>
