import { createRouter, createWebHistory } from 'vue-router'
import { registerGuards } from './guards'
import config from '../config'

import EntryPage from '../pages/EntryPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: EntryPage,
      props: () => ({ entryName: config.mainPage }),
    },
    {
      path: '/wiki/All_Pages',
      component: () => import('../pages/AllPagesPage.vue'),
    },
    {
      path: '/wiki/Random',
      component: () => import('../pages/RandomPage.vue'),
    },
    {
      path: '/wiki/:entryName',
      component: EntryPage,
      props: (route) => ({ entryName: route.params.entryName }),
    },
  ],
})

registerGuards(router)

export default router
