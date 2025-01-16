<template>
  <NButton 
    circle
    @click="toggleDark()" 
  >
    <template #icon>
      <template v-if="!isDark">
        <NIcon>
          <SunIcon />
        </NIcon>
      </template>
      <template v-else>
        <NIcon>
          <MoonIcon />
        </NIcon>
      </template>
    </template>
  </NButton>
</template>

<script setup>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core';
import { NButton, NIcon } from 'naive-ui';
import { 
  WbSunnyFilled as SunIcon, 
  NightlightOutlined as MoonIcon 
} from '@vicons/material';

const isDark = useDark();

const toggleDark = async () => {
  console.log("toggle dark " + isDark.value + " => " +!isDark.value)
  useToggle(isDark)()
}

</script>
