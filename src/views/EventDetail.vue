<template>
  <div class="column-detail-page w-75 mx-auto">
    <modal title="イベントを削除" :visible="modalIsVisible"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete"
    >
      <p>ほんとにこのイベントを削除しますか？</p>
    </modal>
    <h1>EventDetial</h1>
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="event">
      <div class="col-3 text-center">
        <van-image
          width="10rem"
          height="10rem"
          round
          fit="contain"
          :src="event.avatar"
        />
      </div>
      <div class="col-9">
        <h4>{{event.title}}</h4>
        <p class="text-muted">{{event.description}}</p>
      </div>
    </div>
    <div v-if="showEditArea" class="btn-group mt-5">
      <router-link
        type="button"
        class="btn btn-success"
        :to="{name: 'createEvent', query: { id: event._id}}"
      >
        編集
      </router-link>
      <button type="button" class="btn btn-danger" @click.prevent="modalIsVisible = true">削除</button>
    </div>
    <post-list :posts="posts"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import store, { EventProps, GlobalDataProps, ResponseType } from '../store'
import Modal from '../components/Modal.vue'
import PostList from '../components/PostList.vue'
import createMessage from '../hooks/createMessage'

export default defineComponent({
  components: {
    PostList,
    Modal
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const router = useRouter()
    const modalIsVisible = ref(false)
    const currentId = route.params.eventId
    onMounted(() => {
      store.dispatch('fetchEvent', currentId)
      store.dispatch('fetchPosts')
      // store.dispatch('fetchEvents')
    })
    const event = computed(() => store.getters.getEventById(currentId))
    const posts = computed(() => store.getters.getPostsByEid(currentId))
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (event.value && event.value.author && isLogin) {
        const eventAuthor = event.value.author
        return eventAuthor === _id
      } else {
        return false
      }
    })
    const hideAndDelete = () => {
      modalIsVisible.value = false
      store.dispatch('deleteEvent', currentId).then((rawData: ResponseType<EventProps>) => {
        console.log(rawData)
        createMessage('削除成功，2秒後イベントへ', 'success', 2000)
        setTimeout(() => {
          router.push(`/community/${rawData.data.community}/`)
        }, 2000)
      })
    }
    return {
      posts,
      event,
      route,
      showEditArea,
      modalIsVisible,
      hideAndDelete
    }
  }
})
</script>
