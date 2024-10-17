import { createRouter, createWebHistory } from "vue-router"
import About from "../pages/about/About.vue"
import Home from "../pages/home/Home.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})