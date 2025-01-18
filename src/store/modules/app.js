import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isDark: false,
    
    isCollapse: false,

    layout: 'full',
    
    tabs: [],
    activeTabPath: '/',
    defaultTabPath: '/'
  }),

  actions: {
    switchCollapse() {
      this.isCollapse = !this.isCollapse
    },

    // tab = { path, title }
    addTab(tab) {
      const findIndex = this.tabs.findIndex(item => item.path === tab.path)
      if (findIndex !== -1) {
        this.tabs.splice(findIndex, 1, tab)
      } else {
        this.tabs.push(tab)
      }
      this.activeTabPath = tab.path
    },

    removeTab(path) {
      this.tabs = this.tabs.filter(t => t.path !== path)
      if (this.activeTabPath === path) {
        this.activeTabPath = this.tabs.length > 0 ? this.tabs[this.tabs.length - 1].path : defaultTabPath 
      }
    },

    setActiveTab(path) {
      this.activeTabPath = path
    }
  }
})