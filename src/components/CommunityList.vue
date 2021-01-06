<template>
  <div v-if="type === 'default'" class="row">
    <div v-for="community in list" :key="community._id" class="col-4  mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
        <van-image
          width="100%"
          height="auto"
          fit="cover"
          :src="community.avatar"
          :alt="community.ticommunityNametle"
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
          fit="contain"
          round
        />
        <p class="text-lowercase font-weight-light text-muted">{{community.communityName}}</p>
        </router-link>
        <van-divider dashed></van-divider>
      </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import store from '../store'
import { useRoute } from 'vue-router'
import { SidebarMenu } from 'vue-sidebar-menu'
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
</style>
