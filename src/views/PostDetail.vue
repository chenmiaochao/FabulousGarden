<template>
  <div class="column-detail-page w-75 mx-auto">
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
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import store, { GlobalDataProps } from '../store'
export default defineComponent({
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const currentId: any = ref('')
    currentId.value = route.params.postId
    const newPost = ref('')
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
      // axios.get('https://api.thecatapi.com/v1/images/search?limt=1').then(res => {
      //   console.log(res.data[0].url)
      //   community.value.avatar = res.data[0].url
      // })
    })
    // console.log(currentId)
    // axios.get(`/post/${currentId.value}`).then(res => {
    //   console.log(res.data)
    //   newPost.value = res.data
    // })
    const post = computed(() => store.getters.getPostById(currentId.value))
    // console.log(post)
    return {
      post,
      route,
      newPost
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
