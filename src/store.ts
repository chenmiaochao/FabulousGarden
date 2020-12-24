import { createStore } from 'vuex'
import { CommunityProps, EventProps, PostProps, testData, testEvent, testPosts } from './testData'
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export interface GolbalDataProps {
  communities: CommunityProps[];
  events: EventProps[];
  posts: PostProps[];
  user: UserProps;
}
const store = createStore<GolbalDataProps>({
  state: {
    communities: testData,
    events: testEvent,
    posts: testPosts,
    user: { isLogin: false }
  },
  mutations: {
    // add (state) {
    //   state.count++
    // }
  }
})

export default store
