import type { RouteRecordRaw } from 'vue-router'


export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      layout: 'login',
      requireAuth: false
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      layout: 'full',
      canAddTab: true,
      requireAuth: true
    },
    alias: '/home'
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/index.vue'),
    meta: {
      title: '个人信息',
      layout: 'full',
      canAddTab: true,
      requireAuth: true
    }
  },
  {
    path: '/charts',
    name: 'Charts',
    children: [
      {
        path: 'system',
        name: 'Charts-System',
        component: () => import('@/views/charts/system/index.vue'),
        meta: {
          title: '系统状态',
          layout: 'full',
          canAddTab: true,
          requireAuth: true
        }
      },
    ]
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '页面飞走了',
      layout: 'empty',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  }
]

