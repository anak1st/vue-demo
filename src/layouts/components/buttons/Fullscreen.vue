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

<script setup>
import { NButton, NIcon } from 'naive-ui';
import { 
  FullscreenOutlined as FullscreenIcon,
  FullscreenExitRound as FullscreenExitIcon
} from '@vicons/material';
import { useFullscreen } from '@vueuse/core';

const { toggle, isFullscreen } = useFullscreen();


</script>