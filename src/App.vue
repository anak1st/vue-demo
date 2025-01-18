<template>
  <NConfigProvider 
    :theme="theme"
    class="h-full w-full"
  >
    <RouterView v-slot="{ Component }">
      <component :is="Layout">
        <transition>
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </transition>
      </component>
    </RouterView>
  </NConfigProvider>
</template>

<script setup>
import { ref, computed, KeepAlive, markRaw, defineAsyncComponent } from 'vue'
import { RouterView, useRoute } from 'vue-router';
import { NConfigProvider, darkTheme } from 'naive-ui';
import { useDark } from '@vueuse/core';

const route = useRoute()
const isDark = useDark();

const theme = computed(() => {
  return isDark.value ? darkTheme : null;
})

const layouts = new Map()
const getLayout = (name) => {
  if (layouts.get(name)) {
    return layouts.get(name)
  }
  const layout = markRaw(defineAsyncComponent(() => import(`@/layouts/${name}/index.vue`)))
  layouts.set(name, layout)
  return layout
}

const Layout = computed(() => {
  const layout = route.meta?.layout
  if (!layout) {
   return null 
  }
  return getLayout(layout)
})

</script>
