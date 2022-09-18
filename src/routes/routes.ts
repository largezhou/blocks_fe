import BPageEditor from '@/components/page-editor/BPageEditor.vue'
import BEventEditor from '@/components/event-editor/BEventEditor.vue'

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BPageEditor,
  },
  {
    path: '/event',
    component: BEventEditor,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
