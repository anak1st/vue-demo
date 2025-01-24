<template>
  <NButton 
    circle
    @click="toggle"
  >
    <template #icon>
      <NIcon>
        <template v-if="isFullscreen">
          <FullscreenExitIcon />
        </template>
        <template v-else>
          <FullscreenIcon />
        </template>
      </NIcon>
    </template>
  </NButton>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import { FullscreenIcon, FullscreenExitIcon } from '@/components/icons';
import { useFullscreen } from '@vueuse/core';


const { toggle, isFullscreen } = useFullscreen();

</script>