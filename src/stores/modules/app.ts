import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useAppStore = defineStore('app', () => {
  const isCollapse = ref(false)

  const switchCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  return { 
    isCollapse, 
    switchCollapse,
  }
})