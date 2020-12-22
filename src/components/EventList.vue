<template>
  <div class="box overflow-scroll flex-nowrap">
    <div v-for="event in list2" :key="event.id" class="mb-4  box-item rounded-circle">
      <div class="">
        <div class="card-body text-center">
          <img  :src="event.avatar" :alt="event.title" class=" border border-light w-25 my-3" >
          <h5 class="card-title">{{event.title}}</h5>
          <a href="#" class="btn btn-outline-primary">img</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface EventProps{
  id: number;
  title: string;
  avatar?: string;
}
export default defineComponent({
  name: 'EventList',
  props: {
    list2: {
      type: Array as PropType<EventProps[]>,
      required: true
    }
  }
})
</script>

<style>
.box{
  display: flex;
}
.box-item{
  height: 80px;
  width: 80px;
  background-color: aqua;
}
</style>
