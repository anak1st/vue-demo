<template>
  <NButton 
    circle 
    @click="toggleDark"
  >
    <template #icon>
      <NIcon>
        <template v-if="!isDark">
          <SunIcon />
        </template>
        <template v-else>
          <MoonIcon />
        </template>
      </NIcon>
    </template>
  </NButton>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { useDark, useToggle } from '@vueuse/core';
import { NButton, NIcon } from 'naive-ui';
import { SunIcon, MoonIcon } from '@/components/icons';


const isDark = useDark();


const toggleDark = async (e: MouseEvent) => {
  const handler = async () => {
    console.log("toggle dark " + isDark.value + " => " + !isDark.value)
    useToggle(isDark)()
    await nextTick()
  }

  if (!document.startViewTransition) {
    return handler()
  }

  const x = e.clientX
  const y = e.clientY

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(handler).ready

  // 相关CSS在 @/main.css 中
  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
}

</script>
