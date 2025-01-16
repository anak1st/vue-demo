

export const basic_routes = [
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/login/index.vue'),
  },
]