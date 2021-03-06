import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import CreateCommunity from './views/CreateCommunity.vue'
import CommunityDetail from './views/CommunityDetail.vue'
import EventDetail from './views/EventDetail.vue'
import PostDetail from './views/PostDetail.vue'
import CreatePost from './views/CreatePost.vue'
import CreateEvent from './views/CreateEvent.vue'
import UserProfile from './views/UserProfile.vue'
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
      path: '/userProfile',
      name: 'userProfile',
      component: UserProfile,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/createC',
      name: 'createCommunity',
      component: CreateCommunity,
      meta: { requiredLogin: true }
    },
    {
      path: '/createE',
      name: 'createEvent',
      component: CreateEvent,
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
      path: '/community/:communityId/:eventId/:postId',
      name: 'postDetail',
      component: PostDetail
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
        store.commit('logout')
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
