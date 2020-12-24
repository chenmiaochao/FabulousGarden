<template>
  <div class="column-detail-page w-75 mx-auto">
    <h1>EventDetial</h1>
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="event">
      <div class="col-3 text-center">
        <img :src="event.avatar && event.avatar.fitUrl" :alt="event.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{event.title}}</h4>
        <p class="text-muted">{{event.description}}</p>
      </div>
    </div>
    <post-list :posts="posts"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GolbalDataProps } from '../store'
import PostList from '../components/PostList.vue'
// import { testPosts, testEvent } from '../testData'
export default defineComponent({
  components: {
    PostList
  },
  setup () {
    const store = useStore<GolbalDataProps>()
    const testEvent = computed(() => store.state.events)
    const testPosts = computed(() => store.state.posts)
    const route = useRoute()
    // string => number
    const currentId = +route.params.eventId
    // 从数组里面找一项 匹配专栏id的testdata
    const event = testEvent.value.find(e => e.id === currentId)
    // 数组里面找许多项 匹配postdata里面的event id = currentid
    const posts = testPosts.value.filter(post => post.eventId === currentId)
    console.log(posts)
    return {
      posts,
      event,
      route
    }
  }
})
</script>
