<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="item in breadcrumbItems" :key="item.key">
      <n-dropdown>
        <div class="flex justify-center items-center ">
          <component :is="item.icon" class="mr-1" />
          <div class="text-sm"> {{ item.name }} </div>
        </div>
      </n-dropdown>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { NBreadcrumb, NBreadcrumbItem, NDropdown } from 'naive-ui';
import { menuOptions, type MenuOptionItem } from '@/router/menu';


const route = useRoute();


const breadcrumbItems = ref<MenuOptionItem[] | null>([]);


const findBreadcrumb = (tree: MenuOptionItem[], key: string): MenuOptionItem[] | null => {
  for (const item of tree) {
    if (item.key === key) {
      return [item];
    }
    if (item.children) {
      const result = findBreadcrumb(item.children, key);
      if (result) {
        return [item, ...result];
      }
    }
  }
  return null;
}

const initBreadcrumbItems = () => {
  breadcrumbItems.value = findBreadcrumb(menuOptions, route.name as string);
}


watch(() => route.name, () => {
  initBreadcrumbItems();
})
onMounted(() => {
  initBreadcrumbItems();
})





</script>