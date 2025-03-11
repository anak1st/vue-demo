<template>
  <n-breadcrumb class="flex justify-center">
    <n-breadcrumb-item v-for="item in breadcrumbItems" :key="item.key">
      <n-dropdown :options="item.children" >
        <div class="flex justify-center items-center ">
          <component :is="item.icon" class="mr-1" />
          <div class=""> {{ item.name }} </div>
        </div>
      </n-dropdown>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { NBreadcrumb, NBreadcrumbItem, NDropdown } from 'naive-ui';
import { usePermissionStore } from '@/stores';
import { renderIcon } from '@/components/icons';


const route = useRoute();
const permissionStore = usePermissionStore();
const breadcrumbItems = ref<UI.CustomMenuOption[] | null>([]);


const APP_TITLE = import.meta.env.VITE_APP_TITLE as string;


const initBreadcrumbItems = () => {
  const findBreadcrumb = (tree: UI.CustomMenuOption[], name: string): UI.CustomMenuOption[] => {
    for (const item of tree) {
      if (item.key === name) {
        return [item];
      }
      if (item.children) {
        const result = findBreadcrumb(item.children, name);
        if (result.length > 0) {
          return [item, ...result];
        }
      }
    }
    return [];
  }
  breadcrumbItems.value = [];
  breadcrumbItems.value.push({
    key: 'root',
    name: APP_TITLE,
    label: APP_TITLE,
    icon: renderIcon('money'),
    children: permissionStore.menuOptions,
  });
  breadcrumbItems.value.push(...findBreadcrumb(permissionStore.menuOptions, route.name as string));
}


watch(() => route.path, () => {
  initBreadcrumbItems();
})

watch(() => permissionStore.menuOptions, () => {
  initBreadcrumbItems();
}, { deep: true });

onMounted(() => {
  initBreadcrumbItems();
})



</script>