<template>
  <div class="home-page">

    <section class="py-5 text-center container">
      <!-- <event-list :list2="list2"></event-list> -->
      <div class="row py-lg-5">
        <div class="col-lg-6 com-md-8 mx-auto">
          <img src="../assets/4.png" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作,自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2">开始写文章</a>
          </p>
        </div>
      </div>
      <community-list :list="list"></community-list>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CommunityList from '../components/CommunityList.vue'
import PostList from '../components/PostList.vue'
import EventList from '../components/EventList.vue'
import { testData, testEvent, testPosts } from '../testData'
import Community from './Community.vue'

export default defineComponent({
  name: 'Home',
  components: {
    CommunityList
    // PostList,
    // EventList,
    // Community
  },
  setup () {
    return {
      list: testData,
      list2: testEvent,
      list3: testPosts
    }
  }
})
</script>
