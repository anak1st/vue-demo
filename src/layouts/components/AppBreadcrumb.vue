<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="item in breadcrumbItems" :key="item.path">
      <n-dropdown>
        <div class="flex justify-center items-center">
          <component :is="item.icon" class="mr-2" />
          {{ item.name }}
        </div>
      </n-dropdown>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { NBreadcrumb, NBreadcrumbItem, NDropdown } from 'naive-ui';
import { menuOptions } from '@/router/menu';


const route = useRoute();

const breadcrumbItems = ref([]);


watch(() => route.name, (name) => {
  breadcrumbItems.value = findBreadcrumb(menuOptions, route.name);
})

onMounted(() => {
  breadcrumbItems.value = findBreadcrumb(menuOptions, route.name); 
})


const findBreadcrumb = (tree, key) => {
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


</script>