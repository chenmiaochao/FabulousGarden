import axios from 'axios'
import { createStore } from 'vuex'
// import { testData, testEvent, testPosts } from './testData'

interface UserProps {
  isLogin: boolean;
  name?: string;
  _id?: string;
  community?: any;
  event?: any;
}
interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}
export interface PostProps {
  _id?: any;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  community?: string;
  event?: string;
}
export interface CommunityProps{
  _id?: string;
  communityName: string;
  avatar?: string;
  description: string;
}
export interface EventProps{
  _id?: string;
  title: string;
  avatar?: string;
  community: string;
}
export interface GlobalDataProps {
  communities: CommunityProps[];
  events: EventProps[];
  posts: PostProps[];
  user: UserProps;
}
const store = createStore<GlobalDataProps>({
  state: {
    communities: [],
    events: [],
    posts: [],
    user: { isLogin: false, name: 'viking', community: 1, event: 1 }
  },
  mutations: {
    login (state) {
      state.user = { ...state, isLogin: true, name: 'chenmiaochao' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    createCommunity (state, newCommunity) {
      state.communities.push(newCommunity)
    },
    fetchCommunities (state, rawdata) {
      console.log(rawdata.data)
      state.communities = rawdata.data
    },
    fetchCommunity (state, rawdata) {
      state.communities = [rawdata.data]
    },
    fetchEvents (state, rawdata) {
      state.events = rawdata.data.list
    },
    fetchEvent (state, rawdata) {
      state.events = [rawdata.data]
    },
    fetchPosts (state, rawdata) {
      state.events = rawdata.data.list
    },
    fetchpost (state, rawdata) {
      state.events = [rawdata.data]
    }
  },
  actions: {
    fetchCommunities (context) {
      axios.get('/api/community').then(res => {
        context.commit('fetchCommunities', res.data)
      })
    },
    fetchCommunity ({ commit }, cid) {
      axios.get(`/community/${cid}`).then(res => {
        commit('fetchCommunity', res.data)
      })
    },
    fetchEvents (context) {
      axios.get('/event').then(res => {
        context.commit('fetchEvents', res.data)
      })
    },
    fetchEvent ({ commit }, eid) {
      axios.get(`/event/${eid}`).then(res => {
        commit('fetchEvent', res.data)
      })
    },
    fetchPosts (context) {
      axios.get('/post').then(res => {
        context.commit('fetchPosts', res.data)
      })
    },
    fetchPost ({ commit }, cid) {
      axios.get(`/post/${cid}`).then(res => {
        commit('fetchPost', res.data)
      })
    }
  },
  getters: {
    // getter返回可以是对象 也可是函数
    getCommunityById: (state) => (id: string) => {
      return state.communities.find(c => c._id === id)
    },
    getEventById: (state) => (id: string): EventProps[] => {
      return state.events.filter(event => event.community === id)
    },
    getPostById: (state) => (id: string): PostProps[] => {
      return state.posts.filter(post => post.event === id)
    }
  }
})

export default store
