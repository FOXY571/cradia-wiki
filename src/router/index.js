import { createRouter, createWebHistory } from 'vue-router'

import EntryPage from '../pages/EntryPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: EntryPage,
      props: () => ({ entryName: 'Cradia_Wiki' }),
    },
    {
      path: '/wiki/All_Pages',
      component: () => import('../pages/AllPagesPage.vue'),
    },
    {
      path: '/wiki/:entryName',
      component: EntryPage,
      props: (route) => ({ entryName: route.params.entryName }),
    },
  ],
})

export default router
