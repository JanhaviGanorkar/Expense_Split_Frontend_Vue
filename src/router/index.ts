import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
   
    {
      path: '/groups',
      name: 'groups',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GroupView.vue'),
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: () => import('../components/Expence.vue'),
    },
    {
      path: '/api',
      name: 'api',
  component: () => import('../components/Api.vue')
    },
        {
      path: '/groups/:id', // Dynamic route to capture the group ID
      name: 'group-details',
      component: () => import('../views/GroupDetailsView.vue')
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    }
  ],
})

export default router
