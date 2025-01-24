import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const pinia = createPinia()

export const setupStore = (app: App) => {
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}

export * from './modules'