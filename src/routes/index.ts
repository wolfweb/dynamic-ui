import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import nProgress from 'nprogress';
import 'nprogress/css/nprogress.css';
import { SchemaMode } from '@/enums/schemaMode';

nProgress.configure({ showSpinner: false });

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    meta: {
      mode: SchemaMode.Preview
    },
    component: () => import("@/views/index.vue")
  },
  {
    path: '/form',
    meta: {
      mode: SchemaMode.Form
    },
    component: () => import("@/editor/index.vue")
  },
  {
    path: '/layout',
    meta: {
      mode: SchemaMode.Layout
    },
    component: () => import("@/editor/index.vue")
  },
  {
    path: '/liquid',
    meta: {
      mode: SchemaMode.Liquid
    },
    component: () => import("@/editor/index.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(() => {
  nProgress.start()
  return true
})

router.afterEach(() => {
  nProgress.done()
})

export default router
