<template>
  <n-tabs type='card' 
    :value="tabStore.activeTabPath" 
    :closable="tabStore.tabs.length > 1"
    @close="tabStore.remove" 
    :tabs-padding=0
    class="custom-tabs p-2"
    size="small"
  >
    <n-tab 
      v-for="it in tabStore.tabs" 
      :key="it.path" 
      :name="it.path" 
      @click="tabStore.setActive(it.path)"
    >
      {{ it.title }}
    </n-tab>
  </n-tabs>
</template>

<script setup lang="ts">
import { NTabs, NTab } from 'naive-ui';
import { useTabStore } from "@/stores";

const tabStore = useTabStore();

</script>

<style scope>
.custom-tabs {
  .n-tabs-tab {
    height: 34px;
    margin-left: 2px !important;
    margin-right: 2px !important;
    border-radius: 4px !important;
    border-width: 1px !important;
    border-color: rgba(24, 160, 88, 0.15) !important;
    background-color: transparent !important;
  }

  .n-tabs-tab--active {
    border: 1px solid rgba(24, 160, 88, 0.9) !important;
    background-color: rgba(24, 160, 88, 0.1) !important;
  }

  .n-tabs-pad,
  .n-tabs-tab-pad,
  .n-tabs-scroll-padding {
    border: none !important;
  }
}

</style>
