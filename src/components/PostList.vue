<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm col card-img-top">
      <van-image
        height="auto"
        fit="cover"
        :src="post.image || 'https://img.yzcdn.cn/vant/cat.jpeg'"
      />
      <div class="card-body">
        <h4><router-link :to="`/community/${post.community}/${post.event}/${post._id}`">{{post.title}}</router-link></h4>
        <div class="row my-3 align-items-center">
          <p :class="{'col-8': post.image}" class="text-muted">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { PostProps } from '../testData'
export default defineComponent({
  props: {
    posts: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  }
})
</script>

<style scoped>
.post-list h4 a {
  text-decoration: none;
  color:#1a1a1a;
}
.post-list h4 a:hover {
  color:#0d6efd;
}
.card-custom {
  margin: 0 auto;
}
</style>
