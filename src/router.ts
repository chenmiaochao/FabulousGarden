import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import CreateCommunity from './views/CreateCommunity.vue'
import CommunityDetail from './views/CommunityDetail.vue'
import EventDetail from './views/EventDetail.vue'
import CreatePost from './views/CreatePost.vue'
import axios from 'axios'
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
      path: '/cretaeC',
      name: 'createCommunity',
      component: CreateCommunity,
      meta: { requiredLogin: false }
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
      meta: { requiredLogin: false }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.log(e)
        localStorage.removeItem('token')
        next('/login')
      })
    } else {
      if (requiredLogin) {
        next('/login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})
export default router
