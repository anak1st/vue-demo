import './main.css'

import { createApp } from 'vue'

import App from './App.vue'
import { setupStore } from '@/stores'
import { setupRouter } from '@/router'


const app = createApp(App)

setupStore(app)
setupRouter(app)


app.mount('#app')
