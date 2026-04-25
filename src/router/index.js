import { createRouter, createWebHistory } from 'vue-router'
import { getAllEntryNames } from '../utils/entryHandler'

import EntryPage from '../pages/EntryPage.vue'

const entryRoutes = getAllEntryNames().map((name) => ({
  path: `/${encodeURIComponent(name)}`,
  name: `${name}`,
  component: EntryPage,
  props: () => ({ entryName: name }),
}))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: entryRoutes.concat([
    {
      path: '/',
      name: 'Cradia_Wiki',
      component: EntryPage,
      props: () => ({ entryName: 'Cradia_Wiki' }),
    },
    {
      path: '/All_Pages',
      name: 'All_Pages',
      component: () => import('../pages/AllPagesPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Not_Found',
      component: () => import('../pages/NotFoundPage.vue'),
    },
  ]),
})

export default router
