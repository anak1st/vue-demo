<template>
  <n-avatar 
    round :size="size"
    style="font-size: 5em;"
  >
    <div class="flex items-center justify-center">
      {{ userStore.username0 }}
    </div>
    
  </n-avatar>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { NAvatar } from 'naive-ui';
import { useUserStore } from '@/stores'

const userStore = useUserStore();


interface Props {
  size?: number | 'small' | 'medium' | 'large'
}

const { size = 'medium' } = defineProps<Props>()

</script>