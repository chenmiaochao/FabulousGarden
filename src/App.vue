<template>
  <div class="container">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <global-header :user="currentUser"></global-header>
    <loader v-if="isLoading" text="読み込み中ぴえん🥺🥺🥺🥺🥺"></loader>
    <div class="row">
      <div class="col-2">
        <community-list :list="list" :type="'round'"></community-list>
      </div>
      <div class="col-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { defineComponent, PropType, reactive, ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import Loader from './components/Loader.vue'
import CommunityList from './components/CommunityList.vue'
import { GlobalDataProps } from './store'
import createMessage from './hooks/createMessage'
/// <reference types="googlemaps" />
/* eslint-disable no-undef */
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader,
    CommunityList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    const error = computed(() => store.state.error)
    const communityData = computed(() => store.state.communities)
    onMounted(() => {
      store.dispatch('fetchCommunities')
      if (!currentUser.value.isLogin && token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })

    return {
      currentUser,
      isLoading,
      list: communityData
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
}
</style>
