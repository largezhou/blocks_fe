import BPageEditor from '@/components/page-editor/BPageEditor.vue'
import BEventTester from '@/components/event-editor/BEventTester.vue'

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BPageEditor,
  },
  {
    path: '/test',
    component: BEventTester,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
