import { createApp } from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
// axios.get('/api/blog/list').then((res) => {
//   console.log(res)
// })
axios.defaults.baseURL = '/api/'
axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})
axios.interceptors.response.use(config => {
  // setTimeout(() => {
  //   store.commit('setLoading', false)
  // }, 2000)
  store.commit('setLoading', false)
  return config
}, e => {
  console.log(e.response)
  const error = e.response.data
  console.log(error)
  store.commit('setError', { status: true, message: error.message })
  store.commit('setLoading', false)
  return Promise.reject(error)
})
const app = createApp(App)
app.use(router)
app.use(store)
app.use(Vant)
app.mount('#app')
