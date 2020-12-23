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
    <!-- <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4><router-link :to="`/posts/${post._id}/`">{{post.title}}</router-link></h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image && typeof post.image !== 'string'" class="col-4">
            <img :src="post.image.fitUrl" :alt="post.title" class="rounded-lg w-100">
          </div>
          <p :class="{'col-8': post.image}" class="text-muted">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '../components/PostList.vue'
import { testPosts, testEvent } from '../testData'
export default defineComponent({
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    // string => number
    const currentId = +route.params.eventId
    // 从数组里面找一项 匹配专栏id的testdata
    const event = testEvent.find(e => e.id === currentId)
    // 数组里面找许多项 匹配postdata里面的event id = currentid
    const posts = testPosts.filter(post => post.eventId === currentId)
    console.log(posts)
    return {
      posts,
      event,
      route
    }
  }
})
</script>
