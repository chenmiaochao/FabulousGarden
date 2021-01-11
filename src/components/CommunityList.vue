<template>
  <div v-if="type === 'default'" class="row">
    <div v-for="community in list" :key="community._id" class="col-4  mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
        <van-image
          min-width="5rem"
          width="100%"
          height="auto"
          fit="cover"
          :src="community.avatar"
          :alt="community.ticommunityNametle"
          @click.prevent="showPostSwiper(community._id)"
        />
          <!-- <img  :src="community.avatar" :alt="community.ticommunityNametle" class="rounded-circle border border-light w-25 my-3" > -->
          <h5 class="card-title">{{community.communityName}}</h5>
          <p class="card-text text-left van-multi-ellipsis--l3">{{community.description}}</p>
          <!-- <router-link :to="/community/+{ name: 'CommunityDetail', params: { id: community.id } }" class="btn btn-outline-primary">进入coummunity</router-link> -->
          <router-link :to="`/community/${community._id}`" class="btn btn-outline-primary w-100">coummunityへ</router-link>
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
        <van-divider dashed></van-divider>
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
import store from '../store'
import { useRoute } from 'vue-router'
import '@vant/touch-emulator'
import CommunityPostSwiper from './CommunityPostSwiper.vue'
export interface CommunityProps{
  id: number;
  communityName: string;
  avatar?: string;
  description: string;
}
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
      show.value = true
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
