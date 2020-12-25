import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Community from './views/Community.vue'
import CommunityDetail from './views/CommunityDetail.vue'
import EventDetail from './views/EventDetail.vue'
import CreatePost from './views/CreatePost.vue'
import store from './store'
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
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/community',
      name: 'community',
      component: Community,
      meta: { requiredLogin: true }
    },
    {
      path: '/community/:communityId',
      name: 'CommunityDetail',
      component: CommunityDetail
    },
    {
      path: '/community/:communityId/:eventId',
      name: 'eventDetail',
      component: EventDetail
    },
    {
      path: '/create',
      name: 'createPost',
      component: CreatePost,
      meta: { requiredLogin: true }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})
export default router
