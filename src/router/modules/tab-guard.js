import { useAppStore } from '@/store/modules/app'

export function createTabGuard(router) {
  const appStore = useAppStore()
  router.afterEach((to) => {
    if (to.meta?.tab !== true) {
      return
    }
    const name = to.name
    const path = to.fullPath
    const title = to.meta?.title
    appStore.addTab({ name, path, title })
  })
}
