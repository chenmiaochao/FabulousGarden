<template>
  <div class="column-detail-page w-75 mx-auto">
    <h1>CommunityDetial</h1>

    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="community">
      <div class="col-3 text-center">
        <img :src="community.avatar && community.avatar.fitUrl" :alt="community.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{community.title}}</h4>
        <p class="text-muted">{{community.description}}</p>
      </div>
    </div>
    <event-list :event="event"></event-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import EventList from '../components/EventList.vue'
import { testData, testEvent } from '../testData'
export default defineComponent({
  components: {
    EventList
  },
  setup () {
    const route = useRoute()
    // string => number
    const currentId = +route.params.communityId
    // 从数组里面找一项 匹配专栏id的testdata
    const community = testData.find(c => c.id === currentId)
    // 数组里面找许多项 匹配event里面的community id = currentid
    const event = testEvent.filter(event => event.communityId === currentId)
    console.log(event)
    return {
      community,
      event,
      route
    }
  }
})
</script>
