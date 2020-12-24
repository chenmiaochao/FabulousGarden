import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Community from './views/Community.vue'
import CommunityDetail from './views/CommunityDetail.vue'
import EventDetail from './views/EventDetail.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/community',
      name: 'community',
      component: Community
    },
    {
      path: '/community/:communityId',
      name: 'CommunityDetail',
      component: CommunityDetail
    },
    {
      path: '/community/:communityId/:eventId',
      name: 'EventDetail',
      component: EventDetail
    }
  ]
})

export default router
