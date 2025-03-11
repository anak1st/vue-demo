<template>
  <n-layout has-sider class="h-full w-full">
    <n-layout-sider 
      collapse-mode="width"
      :collapsed-width="themeStore.theme.sider.collapsedWidth"
      :width="themeStore.theme.sider.width"
      :collapsed="themeStore.theme.sider.isCollapse"
      bordered
      :inverted="themeStore.theme.sider.inverted"
      class="h-full"
      :show-trigger="themeStore.theme.sider.showTrigger"
      @collapse="() => themeStore.switchCollapse(false)"
      @expand="() => themeStore.switchCollapse(true)"
    >
      <AppSider />
    </n-layout-sider>
    <n-layout class="flex flex-col relative">
      <n-layout-header bordered v-if="themeStore.theme.header.show || themeStore.theme.tab.show">
        <AppHeader :style="themeStore.style.header" v-if="themeStore.theme.header.show" />
        <div v-if="themeStore.theme.tab.show">
          <n-divider class="custom-divider !m-0 " />
          <AppTab    :style="themeStore.style.tab" />
        </div>
      </n-layout-header>
      <n-layout-content embedded class="p-3" :style="themeStore.style.content">
        <slot />
      </n-layout-content>
      <n-layout-footer bordered v-if="themeStore.theme.footer.show">
        <AppFooter />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutSider, NLayoutContent, NLayoutHeader, NLayoutFooter, NDivider } from 'naive-ui';
import AppSider  from '@/layouts/components/AppSider.vue';
import AppHeader from '@/layouts/components/AppHeader.vue';
import AppTab    from '@/layouts/components/AppTab.vue';
import AppFooter from '@/layouts/components/AppFooter.vue';
import { useThemeStore } from '@/stores';

const themeStore = useThemeStore();


</script>


<style scoped>

</style>