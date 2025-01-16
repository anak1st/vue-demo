export const app_routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    }
  },
  {
    path: '/',
    name: 'Root',
    component: () => import('@/layouts/full/index.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          tab: true
        }
      } 
    ]
  }
]