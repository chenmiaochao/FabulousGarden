<template>
  <div class="row">
    <div v-for="post in list" :key="post.id" class="mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img  :src="post.avatar" :alt="post.title" class=" border border-light w-25 my-3" >
          <h5 class="card-title">{{post.title}}</h5>
          <p class="card-text text-left">{{post.description}}</p>
          <a href="#" class="btn btn-outline-primary">img</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface PostProps{
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export default defineComponent({
  name: 'PostList',
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true
    }
  }
})
</script>
