<template>
  <div class="row overflow-auto">
    <div v-for="event in event" :key="event.id" class="col">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img  :src="event.avatar" :alt="event.title" class="rounded-circle border border-light w-25 my-3" >
          <h5 class="card-title">{{event.title}}</h5>
          <p class="card-text text-left">{{event.description}}</p>
          <router-link :to="`/community/${event.community}/${event._id}`" class="btn btn-outline-primary">进入event</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { EventProps, testData, testEvent } from '../testData'

export default defineComponent({
  name: 'EventList',
  props: {
    event: {
      type: Array as PropType<EventProps[]>,
      required: true
    }
  }
})
</script>
