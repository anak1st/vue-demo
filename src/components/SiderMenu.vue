<template>
  <n-menu
    ref="menuInstRef"
    :collapsed-icon-size="24"
    :collapsed-width="64"
    :collapsed="appStore.isCollapse"
    :options="menuOptions"
    :value="activeKey"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { NMenu, type MenuInst } from 'naive-ui';

import { useAppStore } from '@/stores';
import { menuOptions } from '@/router/menu';


const route = useRoute();
const appStore = useAppStore()


const activeKey = computed<string>(() => route.name as string);

const menuInstRef = ref<MenuInst | null>(null);
watch(route, async () => {
  await nextTick();
  menuInstRef.value?.showOption();
});

</script>
