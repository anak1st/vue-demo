import type { Router } from 'vue-router'
import { useTabStore } from '@/stores'


export function createTabGuard(router: Router) {
  const tabStore = useTabStore()
  const APP_TITLE = import.meta.env.VITE_APP_TITLE as string
  router.afterEach((to) => {
    if (to.meta?.canAddTab !== true) {
      return
    }
    const name = to.name as string
    const path = to.path
    let title = to.meta?.title as string
    if (to.meta.tabShowId) {
      title = `${title} (${to.params.id})`
    }
    tabStore.add({ path, title, name })
    // add title
    if (title) {
      document.title = APP_TITLE + " - " + title
    }
  })
}
