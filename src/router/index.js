import { createRouter, createWebHistory } from 'vue-router'
import { appRoutes } from './routes'
import { createTabGuard  } from './guards/tab'
import { createAuthGuard } from './guards/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: appRoutes
})

export function setupRouter(app) {
  createTabGuard(router)
  createAuthGuard(router)

  app.use(router)
}
