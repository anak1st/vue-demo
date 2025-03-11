<template>
  <component :is="IconMap[props.name]" />
</template>

<script setup lang="ts">
import { IconMap } from './icons';

const props = defineProps<{
  name: UI.IconName;
}>();

</script>