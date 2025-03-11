import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores'


export function createAuthGuard(router : Router) {
  const authStore = useAuthStore()
  router.beforeEach(async (to, from, next) => {
    if (to.meta?.requireAuth) {
      if (authStore.isLogin) {
        next() 
      } else {
        console.warn('fail to login, redirect to login page')
        next({ path: '/login', query: { redirect: to.fullPath } })
      }
    } else if (to.name === 'login') {
      if (authStore.isLogin) {
        console.warn('already login, redirect to home page')
        next({ path: '/' })
      } else {
        next() 
      }
    } else { 
      next()
    }
  })
}
