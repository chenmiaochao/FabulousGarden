<template>
  <div>
    <h2>CommunityPostSwiper</h2>
    <h3>{{cid}}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'CommunityPostSwiper',
  props: {
    communityId: {
      type: String,
      require: true
    }
  },
  setup (props) {
    onMounted(() => {
      console.log('props.communityId', props.communityId)
    })
    console.log('props.communityId', props.communityId)
    return {
      cid: props.communityId
    }
  }
})
</script>
