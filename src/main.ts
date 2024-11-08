import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import Vue3TouchEvents, { Vue3TouchEventsOptions } from 'vue3-touch-events'
import VuePwaInstallPlugin from 'vue-pwa-install'

const app = createApp(App)
app.use<Vue3TouchEventsOptions>(Vue3TouchEvents, {})
app.use(router)
app.use(VuePwaInstallPlugin)
app.mount('#app')
