<template>
  <div class="row">
    <div v-for="community in list" :key="community._id" class="col-4  mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img  :src="community.avatar" :alt="community.title" class="rounded-circle border border-light w-25 my-3" >
          <h5 class="card-title">{{community.title}}</h5>
          <p class="card-text text-left">{{community.description}}</p>
          <!-- <router-link :to="/community/+{ name: 'CommunityDetail', params: { id: community.id } }" class="btn btn-outline-primary">进入coummunity</router-link> -->
          <router-link :to="`/community/${community._id}`" class="btn btn-outline-primary">进入coummunity</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import store from '../store'
export interface CommunityProps{
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export default defineComponent({
  name: 'CommunityList',
  props: {
    list: {
      type: Array as PropType<CommunityProps[]>,
      required: true
    }
  }
  // setup (props) {
  //   // const columnList = computed(() => {
  //   //   return props.list.map(column => {
  //   //     if (!column.avatar) {
  //   //       column.avatar = require('@/assets/column.png')
  //   //     }
  //   //     return column
  //   //   })
  //   // })
  //   // return {
  //   //   columnList
  //   // }
  // }
})
</script>

<style scoped>
  .waterfall-container {
     /*分几列*/
    column-count: 2;
  }
  .waterfall-item {
     /*不留白，不知道什么意思可以取消这个样式试试*/
    break-inside: avoid;
  }
</style>
