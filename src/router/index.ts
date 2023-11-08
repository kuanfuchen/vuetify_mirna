// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'ProjectInfo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'readAlignment',
        name:'ReadAlignment',
        component: () => import('@/views/ReadPage.vue')
      },
      {
        path: 'visualization',
        name:'Visualization',
        component: () => import('@/views/VisualizationPage.vue')
      },
      {
        path: 'differenceExpression',
        name:'DifferenceExpression',
        component: () => import('@/views/DisserenceExpression.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
