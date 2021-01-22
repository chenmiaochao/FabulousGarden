import axios, { AxiosRequestConfig } from 'axios'
import { createStore, Commit } from 'vuex'
import PrefecturesContent from '../content'
// import { testData, testEvent, testPosts } from './testData'
export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P;
}
export interface UserProps {
  isLogin: boolean;
  name?: string;
  _id?: string;
  community?: string;
  event?: string;
}
export interface ImageProps {
  _id?: string;
  imgUrl?: string;
  createdAt?: string;
  latlng?: object;
}
export interface PostProps {
  _id?: any;
  author?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: string;
  createdAt?: string;
  createdAtMonth?: string;
  community?: string;
  event?: string;
}
export interface CommunityProps{
  _id?: string;
  author: string;
  communityName: string;
  avatar?: string;
  description: string;
}
export interface EventProps{
  _id?: string;
  author: string;
  eventName: string;
  date: string | null | object;
  place?: string | null;
  price?: number;
  description: string;
  avatar?: string;
  community: string;
}
export interface MakerProps{
  position?: object;
  title?: string;
  draggable: boolean;
}
export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  loading: boolean;
  communities: CommunityProps[];
  events: EventProps[];
  posts: PostProps[];
  user: UserProps;
  hotels: any;
  markers: MakerProps[];
}
export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}
const getAndCommitWithParams = async (url: string, mutationName: string, commit: Commit, params: any) => {
  // console.log(params)
  const { data } = await axios.get(url, { params })
  commit(mutationName, data)
  return data
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
  return data
}
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  console.log(payload)
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}
const asyncAndCommit = async (url: string, mutationName: string, commit: Commit, config: AxiosRequestConfig = { method: 'get' }) => {
  const { data } = await axios(url, config)
  commit(mutationName, data)
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    communities: [],
    events: [],
    posts: [],
    user: { isLogin: false },
    hotels: [],
    markers: [{
      position: { lat: 35.1, lng: 135.1 },
      title: 'position1',
      draggable: false
    }]
  },
  mutations: {
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    updatePost (state, { data }) {
      state.posts = state.posts.map(post => {
        if (post._id === data._id) {
          return data
        } else {
          return post
        }
      })
    },
    deletePost (state, { data }) {
      state.posts = state.posts.filter(post => post._id !== data._id)
    },
    createEvent (state, rawdata) {
      state.events = rawdata.data
    },
    updateEvent (state, { data }) {
      state.events = state.events.map(event => {
        if (event._id === data._id) {
          return data
        } else {
          return event
        }
      })
    },
    deleteEvent (state, { data }) {
      state.posts = state.posts.filter(post => post._id !== data._id)
    },
    createCommunity (state, newCommunity) {
      state.communities.push(newCommunity)
    },
    updateCommunity (state, { data }) {
      state.communities = state.communities.map(community => {
        if (community._id === data._id) {
          return data
        } else {
          return community
        }
      })
    },
    deleteCommunity (state, { data }) {
      state.posts = state.posts.filter(post => post._id !== data._id)
    },
    fetchCommunities (state, rawdata) {
      state.communities = rawdata.data
    },
    fetchCommunity (state, rawdata) {
      state.communities = [rawdata.data]
    },
    fetchCommunitiesWithEvents (state, rawdata) {
      // console.log('fetchCommunitiesWithEvents', rawdata.data)
      state.communities = rawdata.data
      // console.log(state.communities)
    },
    fetchEvents (state, rawdata) {
      state.events = rawdata.data
    },
    fetchEvent (state, rawdata) {
      // console.log([rawdata.data])
      state.events = [rawdata.data]
    },
    fetchPosts (state, rawdata) {
      state.posts = rawdata.data
      // console.log(state.posts)
    },
    fetchPost (state, rawdata) {
      // console.log(rawdata)
      state.posts = [rawdata.data]
    },
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    fetchCurrentUser (state, rawdata) {
      state.user = { isLogin: true, ...rawdata }
    },
    login (state, rawdata) {
      console.log('front-login-data', rawdata)
      // backendからtokenを取得、localStorageに設置
      const token = rawdata.token
      localStorage.setItem('token', token)
      state.token = token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    logout (state) {
      state.token = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    },
    fetchHotel (state, rawdata) {
      state.hotels = rawdata
      // console.log(rawdata)
    },
    fecthMakerData (state, rawdata) {
      state.markers = rawdata.data
      console.log(rawdata.data)
      return rawdata.data
    }
  },
  actions: {
    fetchCommunities ({ commit }) {
      return getAndCommit('/community', 'fetchCommunities', commit)
    },
    fetchCommunity ({ commit }, cid) {
      return getAndCommit(`/community/${cid}`, 'fetchCommunity', commit)
    },
    createCommunity ({ commit }, payload) {
      return postAndCommit('/community/new', 'createCommunity', commit, payload)
    },
    updateCommunity ({ commit }, { id, payload }) {
      return asyncAndCommit(`/community/${id}`, 'updateCommunity', commit, {
        method: 'patch',
        data: payload
      })
    },
    deleteCommunity ({ commit }, id) {
      return asyncAndCommit(`/community/${id}`, 'deleteCommunity', commit, {
        method: 'delete'
      })
    },
    fetchCommunitiesWithEvents ({ commit }) {
      return getAndCommit('/community/all', 'fetchCommunitiesWithEvents', commit)
    },
    fetchEvents ({ commit }) {
      return getAndCommit('/event', 'fetchEvents', commit)
    },
    fetchEvent ({ commit }, eid) {
      return getAndCommit(`/event/${eid}`, 'fetchEvent', commit)
    },
    createEvent ({ commit }, payload) {
      return postAndCommit('/event/new', 'createEvent', commit, payload)
    },
    updateEvent ({ commit }, { id, payload }) {
      return asyncAndCommit(`/event/${id}`, 'updateEvent', commit, {
        method: 'patch',
        data: payload
      })
    },
    deleteEvent ({ commit }, id) {
      return asyncAndCommit(`/event/${id}`, 'deleteEvent', commit, {
        method: 'delete'
      })
    },
    fetchPosts ({ commit }) {
      return getAndCommit('/post', 'fetchPosts', commit)
    },
    fetchPost ({ commit }, pid) {
      return getAndCommit(`/post/${pid}`, 'fetchPost', commit)
    },
    createPost ({ commit }, payload) {
      return postAndCommit('/post/new', 'createPost', commit, payload)
    },
    updatePost ({ commit }, { id, payload }) {
      return asyncAndCommit(`/post/${id}`, 'updatePost', commit, {
        method: 'patch',
        data: payload
      })
    },
    deletePost ({ commit }, id) {
      return asyncAndCommit(`/post/${id}`, 'deletePost', commit, {
        method: 'delete'
      })
    },
    fetchCurrentUser ({ commit }) {
      return getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    fetchHotel ({ commit }, payload) {
      // console.log(payload)
      const params = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        s_area: payload[2].code
      }
      return getAndCommitWithParams('/event/jalan', 'fetchHotel', commit, params)
    },
    fecthMakerData ({ commit }, payload) {
      console.log(payload)
      return postAndCommit('/event/yahooGeo', 'fecthMakerData', commit, payload)
    },
    fetchHotelAndMarkers ({ dispatch }, payload) {
      console.log('payload', payload)
      // const params = {
      //   // eslint-disable-next-line @typescript-eslint/camelcase
      //   s_area: payload[2].code
      // }
      return dispatch('fetchHotel', payload).then((rawdata) => {
        // console.log(this.state.hotels)
        console.log(rawdata)
        return dispatch('fecthMakerData', rawdata)
      })
    }
  },
  getters: {
    // getter返回可以是对象 也可是函数
    // カクカクの詳細データ
    getCommunityById: (state) => (id: string) => {
      return state.communities.find(c => c._id === id)
    },
    getEventById: (state) => (id: string) => {
      // console.log(state.events)
      return state.events.find(event => event._id === id)
    },
    getPostById: (state) => (id: string) => {
      return state.posts.find(post => post._id === id)
    },
    // cidでからevent list取得
    getEventsByCid: (state) => (cid: string) => {
      return state.events.filter(e => e.community === cid)
    },
    // eidからpost list取得
    getPostsByEid: (state) => (eid: string) => {
      // console.log('state.posts', state.posts)
      return state.posts.filter(p => p.event === eid)
    },
    getPostsByCid: (state) => (cid: string) => {
      // console.log('state.posts by cid', state.posts)
      return state.posts.filter(p => p.community === cid)
    },
    getPostsByCidAndSelectFromThisMonth: (state) => (cid: string) => {
      // console.log('state.posts by cid', state.posts)
      const array = state.posts.filter(p => p.community === cid)
      return array.filter(p => p.createdAtMonth === new Date().toLocaleString().split('/')[1])
    },
    getPerfList: (PrefecturesContent) => () => {
      // console.log(PrefecturesContent)
      return PrefecturesContent
    },
    getCommunityByAuthorId: (state) => (aid: string) => {
      return state.communities.filter(c => c.author === aid)
    }
  }
})

export default store
