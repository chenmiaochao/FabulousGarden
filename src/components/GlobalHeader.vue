<template>
  <nav class="navbar navbar-dark bg1 justify-content-between mb-4 px-4">

    <router-link to="/" class="navbar-brand"><img src="@/assets/cat.png" width="120" height="120" class="d-inline-block align-center" alt="" loading="lazy">Fabulous Garden</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inlint-item"><router-link to="/login" class="btn btn-outline-light my-2">ログイン</router-link></li>
      <li class="list-inlint-item"><router-link to="/login" class="btn btn-outline-light my-2">サインアップ</router-link></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`こんにちわ ${user.name}`">
        <dropdown-item>
          <router-link to="/create" class="dropdown-item">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
            </svg>
            新規記事
          </router-link></dropdown-item>
        <dropdown-item disabled>
          <router-link to="#" class="dropdown-item">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-layout-sidebar-inset" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M14 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"/>
              <path d="M3 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
            </svg>
            編集
          </router-link></dropdown-item>
        <dropdown-item><router-link to="#" class="dropdown-item" @click="handleLogout">ログアウト</router-link></dropdown-item>

        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import { useRouter } from 'vue-router'
import store, { UserProps } from '../store'
import DropdownItem from './DropdownItem.vue'
import createMessage from '../hooks/createMessage'
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const router = useRouter()
    const handleLogout = () => {
      store.commit('logout')
      createMessage('ログアウト成功', 'success', 2000)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
    return {
      handleLogout
    }
  }
})
</script>

<style scoped>
.bg{
  background-color: #85FFBD;
  background-image: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%);
}
.bg1{
  background-color: #8EC5FC;
  background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
}
.bg2{
  background-color: #D9AFD9;
  background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
}
</style>
