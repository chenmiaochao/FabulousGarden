import axios from 'axios'
import { createStore, Commit } from 'vuex'
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
  createdAt?: string;
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
  token: string;
  loading: boolean;
  communities: CommunityProps[];
  events: EventProps[];
  posts: PostProps[];
  user: UserProps;
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    token: '',
    loading: false,
    communities: [],
    events: [],
    posts: [],
    user: { isLogin: false, name: 'viking', community: 1, event: 1 }
  },
  mutations: {
    // login (state) {
    //   state.user = { ...state, isLogin: true, name: 'chenmiaochao' }
    // },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    createCommunity (state, newCommunity) {
      state.communities.push(newCommunity)
    },
    fetchCommunities (state, rawdata) {
      state.communities = rawdata.data
    },
    fetchCommunity (state, rawdata) {
      state.communities = [rawdata.data]
    },
    fetchEvents (state, rawdata) {
      state.events = rawdata.data
    },
    fetchEvent (state, rawdata) {
      // console.log([rawdata.data])
      state.events = [rawdata.data]
      // console.log(state.events)
    },
    fetchPosts (state, rawdata) {
      state.events = rawdata.data.list
    },
    fetchpost (state, rawdata) {
      state.events = [rawdata.data]
    },
    setLoading (state, status) {
      state.loading = status
    },
    login (state, rawdata) {
      console.log(rawdata)
      state.token = rawdata.data.token
    }
  },
  actions: {
    fetchCommunities ({ commit }) {
      getAndCommit('/community', 'fetchCommunities', commit)
    },
    fetchCommunity ({ commit }, cid) {
      getAndCommit(`/community/${cid}`, 'fetchCommunity', commit)
    },
    fetchEvents ({ commit }) {
      getAndCommit('/event', 'fetchEvents', commit)
    },
    fetchEvent ({ commit }, eid) {
      getAndCommit(`/event/${eid}`, 'fetchEvent', commit)
    },
    fetchPosts ({ commit }) {
      getAndCommit('/post', 'fetchPosts', commit)
    },
    fetchPost ({ commit }, pid) {
      getAndCommit(`/post/${pid}`, 'fetchPost', commit)
    },
    login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    }
  },
  getters: {
    // getter返回可以是对象 也可是函数
    // カクカクの詳細データ
    getCommunityById: (state) => (id: string) => {
      return state.communities.find(c => c._id === id)
    },
    getEventById: (state) => (id: string): EventProps[] => {
      return state.events.filter(event => event._id === id)
    },
    getPostById: (state) => (id: string): PostProps[] => {
      return state.posts.filter(post => post._id === id)
    },
    // cidからevent list取得
    getEventsByCid: (state) => (cid: string): EventProps[] => {
      return state.events.filter(e => e.community === cid)
    },
    // eidからpost list取得
    getPostsByEid: (state) => (eid: string): PostProps[] => {
      return state.posts.filter(p => p.event === eid)
    }
  }
})

export default store
