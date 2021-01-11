<template>
<div>
    <van-swipe lazy-render class="swipe">
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
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'CommunityPostSwiper',
  props: {
    post: {
      type: Array,
      require: true
    }
  },
  setup (props) {
    const posts = ref(props.post)
    return {
      posts
    }
  }
})
</script>
