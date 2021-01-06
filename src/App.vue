<template>
  <div class="container">
    <van-sticky :offset-top="'95vh'" class="">
      <van-button round icon="plus" type="success" is-link @click="showPopup"></van-button>
    </van-sticky>
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

      <van-popup
        v-model:show="show"
        round
        :safe-area-inset-bottom="true"
        :style="{ height: '14%' }"
        @click.prevent="click"
      >
        <p>
          <router-link to="/createC" class="btn btn-secondary my-2">コミュニティを創生しよう</router-link>
          <router-link to="/createE" class="btn btn-info my-3">イベント生成</router-link>
          <router-link to="/create" class="btn btn-primary my-2">アップしよう</router-link>
        </p>
      </van-popup>
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
    const show = ref(false)
    const showPopup = () => {
      show.value = true
    }
    const click = (event: Event) => {
      show.value = false
    }
    return {
      click,
      currentUser,
      isLoading,
      list: communityData,
      show,
      showPopup
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
.box3{
  width: 15rem;
  height: 15rem;
  border: solid 3px #6091d3;/*線*/
  border-radius: 50% 50% 0 50%;
}
</style>
