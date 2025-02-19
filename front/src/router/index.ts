import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/person',
      name: 'person',
      component: () => import('../views/PersonView.vue'),
    },
    {
      path: '/offer',
      name: 'offers',
      component: () => import('../views/OfferView.vue'),
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('../views/EventView.vue'),
    },
    {
      path : '/organization',
      name : 'organization',
      component : () => import('../views/OrganizationView.vue'),
    }

  ],
})

export default router
