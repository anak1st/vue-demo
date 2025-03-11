import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'


interface Theme {
  sider: {
    isCollapse: boolean,
    inverted: boolean,
    width: number,
    collapsedWidth: number,
    showUserInfo: boolean,
    showTrigger: boolean,
  },
  header: {
    show: boolean
    showTabs: boolean,
    showBreadcrumbs: boolean,
    height: number,
  },
  tab: {
    show: boolean,
    height: number,
  },
  footer: {
    show: boolean,
    height: number,
  },
  layout: "full" | "simple" | "normal" | "default",
}


const ThemeDefault: Theme = {
  sider: {
    isCollapse: false,
    inverted: true,
    width: 250,
    collapsedWidth: 60,
    showUserInfo: false,
    showTrigger: false,
  },
  header: {
    show: true,
    showTabs: false,
    showBreadcrumbs: false,
    height: 55,
  },
  tab: {
    show: true,
    height: 50,
  },
  footer: {
    show: true,
    height: 25,
  },
  layout: "default",
}


export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>(JSON.parse(JSON.stringify(ThemeDefault)));

  // load theme from local storage
  const themeLocal = localStorage.getItem('theme');
  if (themeLocal) {
    theme.value = JSON.parse(themeLocal);
  }

  // save theme to local storage
  watch(theme, (value) => {
    localStorage.setItem('theme', JSON.stringify(value));
  }, { deep: true });


  const switchCollapse = (value?: boolean) => {
    if (value !== undefined) {
      theme.value.sider.isCollapse = value;
    }
    theme.value.sider.isCollapse = !theme.value.sider.isCollapse;
  }

  
  const reset = () => {
    theme.value = JSON.parse(JSON.stringify(ThemeDefault));
  }


  const setCompactHeaderTab = (value: boolean) => {
    if (value) {
      theme.value.tab.show = false;
      theme.value.header.showBreadcrumbs = false;
      theme.value.header.showTabs = true;
    } else {
      theme.value.tab.show = true;
      theme.value.header.showBreadcrumbs = true;
      theme.value.header.showTabs = false;
    }
  }


  const setLayout = (layout: Theme['layout']) => {
    reset();
    theme.value.layout = layout;
    switch (layout) {
      case 'full':
        theme.value.header.showBreadcrumbs = true;
        break;
      case 'simple':
        theme.value.header.show = false;
        theme.value.tab.show = false;
        theme.value.footer.show = false;
        theme.value.sider.showUserInfo = true;
        theme.value.sider.showTrigger = true;
        break;
      case 'normal':
        setCompactHeaderTab(true);
        break;
      case 'default':
        break;
    }
  }


  const style = {
    sidebarInverted: computed(() => {
      return theme.value.sider.inverted ? 'invert-0' : 'invert-100';
    }),
    header: computed(() => {
      return `height: ${theme.value.header.height}px`;
    }),
    tab: computed(() => {
      return `height: ${theme.value.tab.height}px`;
    }),
    footer: computed(() => {
      return `height: ${theme.value.footer.height}px`;
    }),
    content: computed(() => {
      let hight = 0;
      if (theme.value.header.show) {
        hight += theme.value.header.height;
        hight += 0;
      }
      if (theme.value.tab.show) {
        hight += theme.value.tab.height
        hight += 1;
      }
      if (theme.value.footer.show) {
        hight += theme.value.footer.height;
        hight += 2;
      }
      return `height: calc(100% - ${hight}px)`;
    }),
  }

  return {
    theme,
    style,
    reset,
    setCompactHeaderTab,
    setLayout,
    switchCollapse,
  }
})