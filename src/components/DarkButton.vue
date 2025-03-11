<template>
  <NButton 
    circle type="primary" ghost bordered
    @click="isDark = !isDark"
  >
    <template #icon>
      <NIcon>
        <Icon :name="isDark ? 'moon' : 'sun'" />
      </NIcon>
    </template>
  </NButton>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core';
import { NButton, NIcon } from 'naive-ui';
import Icon from '@/components/Icon.vue';


const isDark = useDark();

</script>
