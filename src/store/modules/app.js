import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAppStore = defineStore('app', () => {
  const isDark = ref(false);
  const isCollapse = ref(false);
  const tabs = ref([]);
  const activeTabPath = ref('/');

  const switchCollapse = () => {
    isCollapse.value = !isCollapse.value;
  };

  // tab = { name, path, title }
  const addTab = (tab) => {
    const findIndex = tabs.value.findIndex(item => item.path === tab.path);
    if (findIndex !== -1) {
      tabs.value.splice(findIndex, 1, tab);
    } else {
      tabs.value.push(tab);
    }
    activeTabPath.value = tab.path;
  };

  const removeTab = (path) => {
    tabs.value = tabs.value.filter(t => t.path !== path)
    if (activeTabPath.value === path) {
      const len = tabs.value.length;
      const nextIndex = len > 0 ? tabs.value[len - 1].path : '/';
      activeTabPath.value = nextIndex;
      return nextIndex;
    }
    return null;
  };

  const setActiveTab = (path) => {
    activeTabPath.value = path;
  };

  return { 
    isDark, 
    isCollapse, 
    tabs, 
    activeTabPath, 
    switchCollapse, 
    addTab, 
    removeTab, 
    setActiveTab 
  }
})