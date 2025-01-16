import { createRouter, createWebHistory } from 'vue-router'
import { basic_routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: basic_routes
})

export function setupRouter(app) {
  app.use(router)
}
