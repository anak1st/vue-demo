<template>
  <div class="h-full w-full">
    <div class="fixed right-0 top-3 z-50">
      <ToggleTheme class="mr-3" />
      <Fullscreen  class="mr-3" />
    </div>
    <div class="h-full w-full flex items-center justify-center">
      <NCard 
        class="w-[600px] h-[700px]"
        title="卡片插槽示例"
      >
        <template #header-extra>
          #header-extra
        </template>
        <template #default>
          #default
        </template>
        <template #footer>
          #footer
        </template>
        <template #action>
          #action
        </template>
      </NCard>
    </div>
  </div>
</template>

<script setup>
import { NCard, NForm } from 'naive-ui';

import ToggleTheme from '@/components/ToggleTheme.vue';
import Fullscreen  from '@/components/Fullscreen.vue';


</script>
