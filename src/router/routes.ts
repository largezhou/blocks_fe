import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BEditor from '@/components/editor/BEditor.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BEditor,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
