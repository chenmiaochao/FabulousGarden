<template>
  <div class="column-detail-page w-75 mx-auto">
    <h1>CommunityDetial</h1>

    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="community">
      <div class="col-3 text-center">
        <img :src="community.avatar && community.avatar.fitUrl" :alt="community.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{community.title}}</h4>
        <p class="text-muted">{{community.description}}</p>
      </div>
    </div>
    <div v-else>{{community}}community</div>
    <event-list :event="event"></event-list>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      昔の今月のシェア、もう一度ご覧になって
    </van-divider>
    <post-list :posts="postInThisMonth"></post-list>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      コミュニティシェア
    </van-divider>
    <post-list :posts="post"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import { useRoute } from 'vue-router'
import EventList from '../components/EventList.vue'
import axios from 'axios'
import PostList from '../components/PostList.vue'
import { addColumnAvatar } from '../helper'
// import { testData, testEvent } from '../testData'
export default defineComponent({
  components: {
    EventList,
    PostList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    // string => number
    const currentId: any = ref('')
    currentId.value = route.params.communityId
    // console.log(currentId.value)
    onMounted(() => {
      store.dispatch('fetchEvents')
      store.dispatch('fetchPosts')
      const community = computed(() => store.getters.getCommunityById(currentId.value))
      const event = computed(() => store.getters.getEventsByCid(currentId.value))
      const post = computed(() => store.getters.getPostsByCid(currentId.value))
    })
    watch(() => route.params.communityId, () => {
      currentId.value = route.params.communityId
      // console.log(currentId.value)
      const community = computed(() => store.getters.getCommunityById(currentId.value))
      const event = computed(() => store.getters.getEventsByCid(currentId.value))
      const post = computed(() => store.getters.getPostsByCid(currentId.value))
      // axios.get('https://api.thecatapi.com/v1/images/search?limt=1').then(res => {
      //   console.log(res.data[0].url)
      //   community.value.avatar = res.data[0].url
      // })
    })
    // store.dispatch('fetchEvents')
    const community = computed(() => store.getters.getCommunityById(currentId.value))
    const event = computed(() => store.getters.getEventsByCid(currentId.value))
    const post = computed(() => store.getters.getPostsByCid(currentId.value))
    const postInThisMonth = computed(() => store.getters.getPostsByCidAndSelectFromThisMonth(currentId.value))

    return {
      community,
      event,
      route,
      post,
      postInThisMonth
    }
  }
})
</script>
