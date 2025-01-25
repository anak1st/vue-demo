import './main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { setupStore } from '@/stores'
import { setupRouter } from '@/router'
import { setupAxios } from '@/api/init'


const app = createApp(App)

setupStore(app)
setupRouter(app)
setupAxios()

app.mount('#app')
