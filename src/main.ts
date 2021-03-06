import { createApp } from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
// import * as VueGoogleMaps from 'gmap-vue'
// import apiKey from './apiKey.json'
// axios.get('/api/blog/list').then((res) => {
//   console.log(res)
// })

// local
// axios.defaults.baseURL = '/api/'
// production
axios.defaults.baseURL = 'https://hello01-7giu5skn1a268e40-1303914954.ap-shanghai.service.tcloudbase.com/FabulousGarden-backend/api'
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
// app.use(VueGoogleMaps, {
//   load: {
//     key: apiKey.googleApi,
//     libraries: 'places',
//     installComponents: true
// })
app.use(router)
app.use(store)
app.use(Vant)
app.mount('#app')
