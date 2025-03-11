<template>
  <NButton 
    circle type="primary" ghost bordered
    @click="toggle"
  >
    <template #icon>
      <NIcon>
        <template v-if="isFullscreen">
          <Icon name="fullscreen-exit" />
        </template>
        <template v-else>
          <Icon name="fullscreen" />
        </template>
      </NIcon>
    </template>
  </NButton>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import Icon from '@/components/Icon.vue';
import { useFullscreen } from '@vueuse/core';


const { toggle, isFullscreen } = useFullscreen();

</script>