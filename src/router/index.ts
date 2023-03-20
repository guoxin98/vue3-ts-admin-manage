import { createRouter, createWebHashHistory } from 'vue-router'
import { firstMenu } from '@/utils/map-menus'
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
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMath(.*)',
      component: () => import('../views/404/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login') {
    // 如果跳转的路径不是登录页面
    if (token) {
      if (to.path === '/main') {
        next(firstMenu?.url)
      } else {
        next()
      }
    } else {
      next('/login')
    }
  } else {
    if (token) {
      next('/main')
    } else {
      next()
    }
  }
})

export default router
