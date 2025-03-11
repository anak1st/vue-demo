<template>
  <vue-json-pretty 
    :data="props.data" 
    :deep="2"
    :show-icon="true"
    :show-length="true"
    :theme="isDark ? 'dark' : 'light'"
  />
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

const props = defineProps<{
  data: any;
}>();
const isDark = useDark();

</script>