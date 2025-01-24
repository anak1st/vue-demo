import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { createAuthGuard } from './guards/auth'
import { createTabGuard  } from './guards/tab'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export const setupRouter = (app: App) => {
  createAuthGuard(router)
  createTabGuard(router)
  app.use(router)
}
