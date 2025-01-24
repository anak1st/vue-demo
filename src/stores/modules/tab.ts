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
    const index = tabs.value.findIndex(item => item.name === tab.name)
    if (index === -1) {
      tabs.value.push(tab)
    } else {
      tabs.value.splice(index, 1, tab)
    }
    activeTabPath.value = tab.path
  }


  const remove = (path: string) => {
    tabs.value = tabs.value.filter(item => item.path !== path)
    if (activeTabPath.value === path) {
      const len = tabs.value.length
      const nextPath = tabs.value[len - 1]?.path
      if (nextPath) {
        activeTabPath.value = nextPath
        router.push(nextPath)
      }
    }
  }


  const setActive = (path: string) => {
    activeTabPath.value = path
    router.push(path)
  }

  
  return { 
    tabs, 
    activeTabPath, 
    add, 
    remove,
    setActive
  }
})