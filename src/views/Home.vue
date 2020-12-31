<template>
  <div class="home-page">

    <section class="py-5 text-center container">
      <!-- <event-list :list2="list2"></event-list> -->
      <div class="row py-lg-5">
        <div class="col-lg-6 com-md-8 mx-auto">
          <img src="../assets/4.png" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作,自由表达</h2>
          <p>
            <router-link to="/create" class="btn btn-primary my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
      <community-list :list="list"></community-list>
    </section>
    <post-list :posts="posts"></post-list>
    <h4 class="font-weight-bold text-center">发现精彩</h4>

  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import CommunityList from '../components/CommunityList.vue'
import PostList from '../components/PostList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
export default defineComponent({
  name: 'Home',
  components: {
    CommunityList,
    PostList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
      store.dispatch('fetchCommunities')
      store.dispatch('fetchPosts')
    })
    // vue3のstoreはreactiedなもので、storeのstateを取得にはcomuptedが必要
    const communityData = computed(() => store.state.communities)
    const posts = computed(() => store.state.posts)
    return {
      list: communityData,
      posts
    }
  }
})
</script>
