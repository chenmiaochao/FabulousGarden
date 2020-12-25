import { createApp } from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import App from './App.vue'

axios.get('/api/blog/list').then((res) => {
  console.log(res)
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
