<template>
  <div>
    <!-- <community-list :list="communities"></community-list> -->
  </div>
</template>

<script lang="ts">
// import CommunityList from '@/components/CommunityList.vue'
import { defineComponent, ref, computed } from 'vue'
import store, { UserProps } from '../store'
export default defineComponent({
  // components: { CommunityList },
  name: 'UserProfile',
  props: {
    userId: {
      type: String,
      required: true
    },
    components: {
      // CommunityList
    },
    setup () {
      const communities = computed(() => store.getters.getCommunityByAuthorId)
      return communities
    }
  }
})
</script>
