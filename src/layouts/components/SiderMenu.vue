<template>
  <n-menu
    ref="menuInstRef"
    :icon-size="24"
    :collapsed-icon-size="24"
    :collapsed-width="themeStore.theme.sider.collapsedWidth"
    :collapsed="themeStore.theme.sider.isCollapse"
    :options="permissionStore.menuOptions"
    :value="activeKey"
    :inverted="themeStore.theme.sider.inverted"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { NMenu, type MenuInst } from 'naive-ui';

import { useThemeStore } from '@/stores';
import { usePermissionStore } from '@/stores';


const route = useRoute();
const themeStore = useThemeStore()
const permissionStore = usePermissionStore()
const activeKey = computed<string>(() => route.name as string);
const menuInstRef = ref<MenuInst | null>(null);

watch(route, async () => {
  await nextTick();
  menuInstRef.value?.showOption();
});

</script>
