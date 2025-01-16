<template>
  <RouterLink to="/" class="flex justify-center items-center">
    <div class="h-8 w-8">
      <img src="@/assets/naivelogo.svg" alt="Logo" />
    </div>
    <div
      v-show="!appStore.isCollapse"
      class="ml-1 font-bold text-base flex-shrink-0"
    >
      {{ title }}
  </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()

const title = import.meta.env.VITE_APP_TITLE

</script>
