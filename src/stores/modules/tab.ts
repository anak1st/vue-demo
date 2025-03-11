import { ref } from 'vue'
import { defineStore } from 'pinia'
import { router } from '@/router'


interface Tab {
  title: string,
  name: string,
  path: string,
}

export const useTabStore = defineStore('tab', () => {
  const tabs = ref<Tab[]>([])
  const activeTabPath = ref<string>('/home')

  const add = (tab: Tab) => {
    const index = tabs.value.findIndex(item => item.path === tab.path)
    if (index === -1) {
      tabs.value.push(tab)
    }
    activeTabPath.value = tab.path
  }

  const remove = (path: string) => {
    tabs.value = tabs.value.filter(item => item.path !== path)
    if (activeTabPath.value === path) {
      const len = tabs.value.length
      const nextPath = tabs.value[len - 1].path
      activeTabPath.value = nextPath
      router.push(activeTabPath.value);
    }
  }

  const setActive = (path: string) => {
    activeTabPath.value = path
    router.push(activeTabPath.value);
  }

  const clear = (go_home : boolean) => {
    tabs.value = [];
    if (go_home) {
      router.push('/home');
    }
  }

  return { 
    tabs, 
    activeTabPath, 
    add, 
    remove,
    setActive,
    clear,
  }
  
},{
  persist: {
    storage: sessionStorage,
    pick: ['tabs', 'activeTabPath'],
  }
})