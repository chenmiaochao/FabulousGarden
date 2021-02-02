<template>
<div>
    <van-swipe lazy-render class="swipe" width="80%" height="100%" :autoplay="3000">
      <van-swipe-item v-for="postItem in posts" :key="postItem">
        <van-image
          :src="postItem.image"
          width="auto"
          height="auto"
          fit="cover"
        />
      </van-swipe-item>
    </van-swipe>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { PostProps } from '../store'
import '@vant/touch-emulator'
export default defineComponent({
  name: 'CommunityPostSwiper',
  props: {
    post: {
      type: Array as PropType<PostProps[]> | null,
      require: true
    }
  },
  setup (props) {
    const posts = ref(props.post)
    console.log(posts)
    return {
      posts
    }
  }
})
</script>
