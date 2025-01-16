import { createRouter, createWebHistory } from 'vue-router'
import { app_routes } from './routes'
import { createTabGuard } from './modules/tab-guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: app_routes
})

export function setupRouter(app) {
  createTabGuard(router)

  app.use(router)
}
