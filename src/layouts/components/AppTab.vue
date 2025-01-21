<template>
  <n-tabs type='card' 
    :value="appStore.activeTab" 
    :closable="appStore.tabs.length > 1"
    @close="(path) => appStore.removeTab(path)" 
    :tabs-padding=0
    class="custom-tabs p-[6px]"
    size="small"
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
  console.log("Click tab, to " + path);
}

</script>

<style scope>
.custom-tabs {
  .n-tabs-tab {
    margin-left: 2px !important;
    margin-right: 2px !important;
    border-radius: 4px !important;
    border-width: 1px !important;
  }

  .n-tabs-tab--active {
    border: 1px solid rgba(24, 160, 88, 0.4) !important;
    background-color: rgba(24, 160, 88, 0.05) !important;
  }

  .n-tabs-pad,
  .n-tabs-tab-pad,
  .n-tabs-scroll-padding {
    border: none !important;
  }
}

</style>
