import type { RouteRecordRaw } from 'vue-router'


type CustomRecord = RouteRecordRaw & {
  meta?: {
    title?: string
    layout?: 'full' | 'empty' | 'login'
    canAddTab?: boolean
    requireAuth?: boolean
  }
  children?: CustomRecord[]
}


export const routes: CustomRecord[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/LoginPage.vue'),
    meta: {
      title: '登录',
      layout: 'login',
      requireAuth: false
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/HomePage.vue'),
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
    component: () => import('@/views/profile/ProfilePage.vue'),
    meta: {
      title: '个人信息',
      layout: 'full',
      canAddTab: true,
      requireAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      title: '仪表盘',
    },
    children: [
      {
        path: 'status',
        name: 'StatusPage',
        component: () => import('@/views/dashboard/status/StatusPage.vue'),
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
    path: '/system',
    name: 'System',
    meta: {
      title: '系统管理',
    },
    children: [
      {
        path:'user',
        name: 'UserPage',
        component: () => import('@/views/system/user/UserPage.vue'),
        meta: {
          title: '用户管理',
          layout: 'full',
          canAddTab: true,
          requireAuth: true
        }
      },
      {
        path: 'role',
        name: 'RolePage',
        component: () => import('@/views/system/role/RolePage.vue'),
        meta: {
          title: '角色管理',
          layout: 'full',
          canAddTab: true,
          requireAuth: true
        }
      },
      {
        path: 'permission',
        name: 'PermissionPage',
        component: () => import('@/views/system/permission/PermissionPage.vue'),
        meta: {
          title: '权限管理',
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


const createRoutePathNameMap = (routes: CustomRecord[]) => {
  const map: Record<string, { name: string, link: string | null }> = {}
  const find = (routes: CustomRecord[], parentPath = '') => {
    routes.forEach(route => {
      if (!route.name) return
      const key = route.name as string;
      const name = route.meta?.title || key;
      const path = parentPath.length ? `${parentPath}/${route.path}` : route.path
      map[key] = {
        name: name,
        link: route.component ? path : null
      }
      if (route.children) {
        find(route.children, path)
      }
    })
  }
  find(routes, '')
  return map
}


export const routePathNameMap = createRoutePathNameMap(routes)
