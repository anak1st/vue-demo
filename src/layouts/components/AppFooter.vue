<template>
  <div class="flex justify-center items-center" :style="themeStore.style.footer">
    Copyright © 2025 Anak1st
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores';

const themeStore = useThemeStore();

</script>
