import type { Router } from 'vue-router'
import { useTabStore } from '@/stores'


export function createTabGuard(router: Router) {
  const tabStore = useTabStore()
  router.afterEach((to) => {
    if (to.meta?.canAddTab !== true) {
      return
    }
    const name = to.name as string
    const path = to.path
    const title = to.meta?.title as string
    tabStore.add({ name, path, title })
  })
}
