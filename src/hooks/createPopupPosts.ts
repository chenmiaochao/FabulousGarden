import { createApp, Ref } from 'vue'
import CommunityPostSwiper from '../components/CommunityPostSwiper.vue'
// export type MessageType = 'success' | 'error' | 'default'

function createMessage (postList: Ref<any>) {
  // vueのMessageコンポーネントのインスタンスを作成
  const postsInstance = createApp(CommunityPostSwiper, {
    post: postList
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  postsInstance.mount(mountNode)
}

export default createMessage
