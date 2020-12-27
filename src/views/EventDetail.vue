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
import store, { GlobalDataProps } from '../store'
import PostList from '../components/PostList.vue'
export default defineComponent({
  components: {
    PostList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    // string => number +
    const currentId = route.params.eventId
    onMounted(() => {
      store.dispatch('fetchEvent', currentId)
      // store.dispatch('fetchPosts')
    })
    const event = computed(() => store.getters.getEventById(currentId))
    const posts = computed(() => store.getters.getPostById(currentId))
    return {
      posts,
      event,
      route
    }
  }
})
</script>
