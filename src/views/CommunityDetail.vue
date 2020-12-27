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
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import { useRoute } from 'vue-router'
import EventList from '../components/EventList.vue'
// import { testData, testEvent } from '../testData'
export default defineComponent({
  components: {
    EventList
  },
  setup () {
    const store = useStore<GlobalDataProps>()

    const route = useRoute()
    // string => number
    const currentId = route.params.communityId
    onMounted(() => {
      store.dispatch('fetchCommunity', currentId)
      store.dispatch('fetchEvents')
    })
    const community = computed(() => store.getters.getCommunityById(currentId))
    const event = computed(() => store.getters.getEventById(currentId))
    return {
      community,
      event,
      route
    }
  }
})
</script>
