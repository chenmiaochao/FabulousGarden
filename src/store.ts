import { createStore } from 'vuex'
import { CommunityProps, EventProps, PostProps, testData, testEvent, testPosts } from './testData'
export type { PostProps }
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  communityId?: number;
  eventId?: number;
}
export interface GlobalDataProps {
  communities: CommunityProps[];
  events: EventProps[];
  posts: PostProps[];
  user: UserProps;
}
const store = createStore<GlobalDataProps>({
  state: {
    communities: testData,
    events: testEvent,
    posts: testPosts,
    user: { isLogin: false, name: 'viking', communityId: 1, eventId: 1 }
  },
  mutations: {
    login (state) {
      state.user = { ...state, isLogin: true, name: 'chenmiaochao' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    }
  },
  getters: {
    // getter返回可以是对象 也可是函数
    getCommunityById: (state) => (id: number) => {
      return state.communities.find(c => c.id === id)
    },
    getEventById: (state) => (id: number): EventProps[] => {
      return state.events.filter(event => event.communityId === id)
    },
    getPostById: (state) => (id: number): PostProps[] => {
      return state.posts.filter(post => post.eventId === id)
    }
  }
})

export default store
