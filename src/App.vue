<template>
  <n-config-provider 
    :theme="theme"
    :theme-overrides="isDark ? themeOverridesDark : themeOverridesLight"
    class="h-full w-full"
    :locale="zhCN" :date-locale="dateZhCN"
  >
    <n-message-provider>
      <n-modal-provider>
        <router-view v-slot="{ Component }">
          <component :is="Layout">
            <transition name="fade-slide" mode="out-in" appear>
              <keep-alive :include="keepAliveNames" >
                <component :is="Component" />
              </keep-alive>
            </transition>
          </component>
        </router-view>
      </n-modal-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, markRaw, defineAsyncComponent } from 'vue'
import { RouterView, useRoute } from 'vue-router';
import { NConfigProvider, NMessageProvider, NModalProvider, darkTheme, zhCN, dateZhCN } from 'naive-ui';
import type { GlobalThemeOverrides } from 'naive-ui';
import { useDark } from '@vueuse/core';
import { useThemeStore, useTabStore } from './stores';


const route = useRoute()
const isDark = useDark();
const tabStore = useTabStore();
const themeStore = useThemeStore();


const theme = computed(() => {
  return isDark.value ? darkTheme : null;
})


// override theme
const themeOverridesLight = computed(() => {
  return {
    Menu: {
      dividerColor: themeStore.theme.sider.inverted ? 'rgba(255, 255, 255, 0.12)' : undefined,
    }
  } as GlobalThemeOverrides
})

const themeOverridesDark = computed(() => {
  return {
  } as GlobalThemeOverrides
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
  return getLayout(layoutName as string)
})

const keepAliveNames = computed(() => {
  return tabStore.tabs.map(tab => tab.name)
})

</script>

<style scoped>
/* transition fade-slide */
.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-2%);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(2%);
}
</style>