<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 com-md-8 mx-auto">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item><img src="../assets/1.png" alt="callout" class="w-50"/></van-swipe-item>
            <van-swipe-item><img src="../assets/2.png" alt="callout" class="w-50"/></van-swipe-item>
            <van-swipe-item><img src="../assets/3.png" alt="callout" class="w-50"/></van-swipe-item>
            <van-swipe-item><img src="../assets/4.png" alt="callout" class="w-50"/></van-swipe-item>
          </van-swipe>
          <h2 class="font-weight-light">心のままにシェアしよう</h2>
          <p>
            <router-link to="/createC" class="btn btn-secondary my-2">コミュニティを創生しよう</router-link>
            <router-link to="/createE" class="btn btn-info my-3">イベント生成</router-link>
            <router-link to="/create" class="btn btn-primary my-2">アップしよう</router-link>
          </p>
        </div>
      </div>
      <community-list :list="list" :type="'default'"></community-list>
    </section>
    <post-list :posts="posts"></post-list>
    <h4 class="font-weight-bold text-center">fabulousを発見！</h4>

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
    const communityData = computed(() => store.getters.getCommunities)
    const posts = computed(() => store.getters.getPosts)
    return {
      list: communityData,
      posts,
      imgList: [
        '../assets/4.png',
        '../assets/3.png',
        '../assets/2.png',
        '../assets/1.png'
      ]
    }
  }
})
</script>

<style scoped>
.home-page{
  margin-left: 18%;
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
  }
</style>
