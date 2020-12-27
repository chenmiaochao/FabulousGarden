<template>
  <div class="container">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <global-header :user="currentUser"></global-header>
    <loader v-if="isLoading" text="読み込み中ぴえん🥺🥺🥺🥺🥺"></loader>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { defineComponent, PropType, reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import Loader from './components/Loader.vue'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup () {
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    return {
      currentUser,
      isLoading
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
  margin-top: 60px;
}
</style>
