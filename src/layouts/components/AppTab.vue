<template>
  <n-tabs 
    class="mt-2"
    type='card'
    :value="appStore.activeTab"
    :closable="appStore.tabs.length > 1"
    @close="(path) => appStore.removeTab(path)"
    :tabs-padding=10
  >
    <n-tab
      v-for="it in appStore.tabs"
      :key="it.path"
      :name="it.path"
      @click="onTabClick(it.path)"
    >
      {{ it.title }}
    </n-tab>
  </n-tabs>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { NTabs, NTab } from 'naive-ui';
import { useAppStore } from "@/store/modules/app";

const router = useRouter();
const appStore = useAppStore();

const onTabClick = (path) => {
  appStore.setActiveTab(path);
  router.push(path);
  console.log("click on tab, redirect to " + path);
}

</script>