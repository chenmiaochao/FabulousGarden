<template>
  <article class="column-detail-page w-75 mx-auto">
    <modal title="POSTを削除" :visible="modalIsVisible"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete"
    >
      <p>ほんとにこのPOSTを削除しますか？</p>
    </modal>
    <h1>PostDetial</h1>
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="post">
      <div class="col-9">
        <h4>{{post.title}}</h4>
        <p class="text-muted">{{post.content}}</p>
      </div>
      <div class="text-center post-img-container w-100">
      <div class="text-center post-img-cover">
        <img :src="post.image" :alt="post.title" class="post-img">
      <!-- <img :src="post.imgUrl || post.imgUrl.fitUrl || post.image" :alt="post.title" class="w-100"> -->
      </div>
    </div>
    </div>
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-else>
      <div class="col-9">
        <h4>{{newPost.title}}</h4>
        <p class="text-muted">{{newPost.content}}</p>
      </div>
      <div class="text-center post-img-container w-100">
      <div class="text-center post-img-cover">
        <img :src="newPost.image" :alt="newPost.title" class="post-img">
      <!-- <img :src="post.imgUrl || post.imgUrl.fitUrl || post.image" :alt="post.title" class="w-100"> -->
      </div>
    </div>
  </div>
  <div v-if="showEditArea" class="btn-group mt-5">
    <router-link
      type="button"
      class="btn btn-success"
      :to="{name: 'createPost', query: { id: post._id}}"
    >
      編集
    </router-link>
    <button type="button" class="btn btn-danger" @click.prevent="modalIsVisible = true">削除</button>
  </div>
  </article>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Modal from '../components/Modal.vue'
import store, { GlobalDataProps, UserProps, PostProps, ResponseType } from '../store'
import createMessage from '../hooks/createMessage'

export default defineComponent({
  name: 'PostDetail',
  components: {
    Modal
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const router = useRouter()
    const modalIsVisible = ref(false)
    const currentId: any = ref('')
    currentId.value = route.params.postId
    const newPost = ref('')
    const post = computed(() => store.getters.getPostById(currentId.value))
    onMounted(() => {
      store.dispatch('fetchPost', currentId.value)
      // store.dispatch('fetchEvents')
    })
    watch(() => route.params.postId, () => {
      currentId.value = route.params.postId
      // console.log(currentId.value)
      const community = computed(() => store.getters.getCommunityById(currentId.value))
      const event = computed(() => store.getters.getEventsByCid(currentId.value))
      const post = computed(() => store.getters.getPostsByCid(currentId.value))
    })
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (post.value && post.value.author && isLogin) {
        const postAuthor = post.value.author
        return postAuthor === _id
      } else {
        return false
      }
    })
    const hideAndDelete = () => {
      modalIsVisible.value = false
      store.dispatch('deletePost', currentId.value).then((rawData: ResponseType<PostProps>) => {
        console.log(rawData)
        createMessage('削除成功，2秒後イベントへ', 'success', 2000)
        setTimeout(() => {
          router.push(`/community/${rawData.data.community}/${rawData.data.event}/`)
        }, 2000)
      })
    }
    return {
      post,
      route,
      newPost,
      showEditArea,
      modalIsVisible,
      hideAndDelete
    }
  }
})
</script>

<style>
.post-img-container{
  width: 100%;
  margin: 0 auto;
  background-image: url('https://6865-hew-6gnlqghu3cfd5ebd-1303914954.tcb.qcloud.la/uploads/photo_back1.png');
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
}
.post-img-cover{
  width: 70%;
  height: 200px;
  background: aquamarine;
}
.post-img {
  background: aqua;
  height: 100%;
}
.post-img img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
