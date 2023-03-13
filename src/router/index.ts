import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // 路径映射关系
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMath(.*)',
      component: () => import('../views/404/index.vue')
    }
  ]
})
export default router
