import { createRouter, createWebHistory } from 'vue-router'
import EntryPage from '../pages/EntryPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      name: 'entry',
      component: EntryPage,
    },
  ],
})

export default router
