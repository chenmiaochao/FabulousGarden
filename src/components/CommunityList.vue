<template>
  <div v-if="type === 'default'" class="row">
    <div class=" d-flex flex-row flex-nowrap overflow-scroll">
      <div v-for="community in list" :key="community._id" class="col-4  mb-4">
        <div class="card-body text-center">
          <van-image
            round
            fit="cover"
            max-height="15rem"
            max-width="15rem"
            width="10rem"
            height="10rem"
            min-width="5rem"
            min-height="5rem"
            :src="community.avatar"
            :alt="community.description"
            @click.prevent="showPostSwiper(community._id)"
            class="shadow-sm"
          />
          <!-- <img  :src="community.avatar" :alt="community.ticommunityNametle" class="rounded-circle border border-light w-25 my-3" > -->
          <h5 class="card-title">{{community.communityName}}</h5>
          <!-- <router-link :to="/community/+{ name: 'CommunityDetail', params: { id: community.id } }" class="btn btn-outline-primary">进入coummunity</router-link> -->
          <router-link :to="`/community/${community._id}`" class="btn btn-outline-primary w-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-forward" viewBox="0 0 16 16">
              <path d="M9.502 5.513a.144.144 0 0 0-.202.134V6.65a.5.5 0 0 1-.5.5H2.5v2.9h6.3a.5.5 0 0 1 .5.5v1.003c0 .108.11.176.202.134l3.984-2.933a.51.51 0 0 1 .042-.028.147.147 0 0 0 0-.252.51.51 0 0 1-.042-.028L9.502 5.513zM8.3 5.647a1.144 1.144 0 0 1 1.767-.96l3.994 2.94a1.147 1.147 0 0 1 0 1.946l-3.994 2.94a1.144 1.144 0 0 1-1.767-.96v-.503H2a.5.5 0 0 1-.5-.5v-3.9a.5.5 0 0 1 .5-.5h6.3v-.503z"/>
            </svg>
          </router-link>
        </div>
      </div>
    </div>

  </div>
  <div v-else-if="type === 'round'" class="">
      <div v-for="community in list" :key="community._id" class="">
        <router-link :to="`/community/${community._id}`">
        <van-image
          :src="community.avatar"
          width="5rem"
          height="5rem"
          fit="cover"
          round
        />
        <p class="text-lowercase font-weight-light text-muted">{{community.communityName}}</p>
        </router-link>
      </div>
  </div>
  <van-popup v-model:show="show" v-model:cid="cid">
    <!-- <van-swipe lazy-render class="swipe">
      <van-swipe-item v-for="postItem in post.value" :key="postItem">
        <van-image
          :src="postItem.image"
          width="auto"
          height="auto"
          fit="cover"
        />
      </van-swipe-item>
    </van-swipe> -->
    <community-post-swiper :post="post.value"></community-post-swiper>
  </van-popup>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import store, { CommunityProps } from '../store'
import '@vant/touch-emulator'
import CommunityPostSwiper from './CommunityPostSwiper.vue'
import createPopupPosts from '../hooks/createPopupPosts'
export type communityListType = 'round' | 'default'
export default defineComponent({
  name: 'CommunityList',
  props: {
    list: {
      type: Array as PropType<CommunityProps[]>,
      required: true
    },
    type: {
      type: String as PropType<communityListType>,
      default: 'default'
    }
  },
  components: {
    CommunityPostSwiper
  },
  setup () {
    const show = ref(false)
    const cid = ref('')
    const post = ref()
    const swipe = ref()
    // post defalut
    post.value = [
      { image: 'https://6865-hew-6gnlqghu3cfd5ebd-1303914954.tcb.qcloud.la/uploads/超 记.png' },
      { image: 'https://6865-hew-6gnlqghu3cfd5ebd-1303914954.tcb.qcloud.la/uploads/超 记.png' },
      { image: 'https://6865-hew-6gnlqghu3cfd5ebd-1303914954.tcb.qcloud.la/uploads/超 记.png' }
    ]
    const showPostSwiper = (id: any) => {
      cid.value = id
      post.value = computed(() => store.getters.getPostsByCid(cid.value))
      // console.log(post.value)
      show.value = true
      // createPopupPosts(post)
    }
    return {
      show,
      cid,
      showPostSwiper,
      post,
      swipe
    }
  }
})
</script>

<style scoped>
.round-com-list{
  background: aquamarine;
  width: 20%;
  /* float: left;
  top:-100vh; */
}
.swipe{
  width: 100%;
}
</style>
