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

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { NMenu } from 'naive-ui';

import { useAppStore } from '@/store/modules/app';
import { menuOptions } from '@/router/menu';


const route = useRoute();
const appStore = useAppStore()


const activeKey = computed(() => route.meta?.parentKey || route.name)

const menuInstRef = ref(null);
watch(route, async () => {
  await nextTick();
  menuInstRef.value?.showOption();
});

</script>
