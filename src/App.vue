<template>
  <n-config-provider 
    :theme="theme"
    class="h-full w-full"
  >
    <n-message-provider>
      <router-view v-slot="{ Component }">
        <component :is="Layout">
          <transition>
            <keep-alive :include="keepAliveNames">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </component>
      </router-view>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, markRaw, defineAsyncComponent } from 'vue'
import { RouterView, useRoute } from 'vue-router';
import { NConfigProvider, NMessageProvider, darkTheme } from 'naive-ui';
import { useDark } from '@vueuse/core';
import { useTabStore } from './stores';


const route = useRoute()
const isDark = useDark();
const tabStore = useTabStore()


const theme = computed(() => {
  return isDark.value ? darkTheme : null;
})


const Layouts = new Map()
const getLayout = (name: string) => {
  if (!Layouts.get(name)) {
    const layoutComponent = markRaw(defineAsyncComponent(() => import(`@/layouts/${name}/index.vue`)))
    Layouts.set(name, layoutComponent)
  }
  return Layouts.get(name)
}

const Layout = computed(() => {
  const layoutName = route.meta?.layout
  if (!layoutName) {
   return null 
  }
  console.log("Layout: ", layoutName)
  return getLayout(layoutName as string)
})

const keepAliveNames = computed(() => {
  return tabStore.tabs.map(tab => tab.name)
})

</script>
