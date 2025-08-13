import { createRouter, createWebHistory } from 'vue-router'
import { getAllEntryNames } from '../utils/entryHandler'

import EntryPage from '../pages/EntryPage.vue'

const entryRoutes = getAllEntryNames().map((name) => ({
  path: `/${encodeURIComponent(name)}`,
  name: `entry-${name}`,
  component: EntryPage,
  props: () => ({ entryName: name }),
}))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: entryRoutes.concat([
    {
      path: '/',
      name: 'home',
      component: EntryPage,
      props: () => ({ entryName: 'home' }),
    },
    {
      path: '/all-pages',
      name: 'all-pages',
      component: () => import('../pages/AllPagesPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../pages/NotFoundPage.vue'),
    },
  ]),
})

export default router
