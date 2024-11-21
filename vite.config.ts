import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      srcDir:"/",
      manifest: {
        name: "PWA App",
        short_name: "PWA App",
        description: "PWA Test App",
        lang: "ja",
        display: "standalone",
        start_url: '/about'
      }
    })
  ],
  server: {
    host: true,
    port: 5173
  }
})
