import { useAuthStore } from '@/store/modules/auth'

export function createAuthGuard(router) {
  const authStore = useAuthStore()
  router.beforeEach(async (to, from, next) => {
    if (to.meta?.requireAuth) {
      if (authStore.isLogin) {
        next() 
      } else {
        next({ name: 'Login' })
      }
    } else if (to.name === 'Login' || to.name === 'Register') {
      if (authStore.isLogin) {
        next({ name: 'Home' }) 
      } else {
        next() 
      }
    } else { 
      next()
    }
  })
}
