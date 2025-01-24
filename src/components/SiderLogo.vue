<template>
  <router-link to="/" class="flex justify-center items-center">
    <div class="h-8 w-8">
      <img src="/naiveui-logo.svg" alt="Logo" />
    </div>
    <div
      v-show="!appStore.isCollapse"
      class="ml-1 font-bold text-base flex-shrink-0"
    >
      {{ APP_TITLE }}
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAppStore } from '@/stores'
const appStore = useAppStore()

const APP_TITLE = import.meta.env.VITE_APP_TITLE

</script>
