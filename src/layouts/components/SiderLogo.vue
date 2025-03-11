<template>
  <router-link to="/" class="flex justify-center items-center">
    <div class="h-8 w-8">
      <img src="/naiveui-logo.svg" alt="Logo" />
    </div>
    <div
      v-show="!themeStore.theme.sider.isCollapse"
      class="ml-6 font-bold text-base"
    >
      {{ APP_TITLE }}
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useThemeStore } from '@/stores'


const themeStore = useThemeStore()

const APP_TITLE = import.meta.env.VITE_APP_TITLE as string


</script>
