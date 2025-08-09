import { createRouter, createWebHistory } from 'vue-router'
import entryHandler from '../util/entryHandler'

const { getAllEntryNames } = entryHandler()

const entryRoutes = getAllEntryNames().map((name) => ({
  path: `/${name}`,
  name: `entry-${name}`,
  component: () => import('../pages/EntryPage.vue'),
}))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: entryRoutes.concat([
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/EntryPage.vue'),
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
