<template>
  <div class="container">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <global-header :user="currentUser"></global-header>
    <post-list :list="list"></post-list>
    <validate-form @form-submit="onFormSubmit">
        <div class="mb-3">
        <label class="form-label">メールアドレス</label>
        <validate-input
          :rules="emailRules" v-model="emailVal"
          placeholder="メルアドレスを入力してください"
          type="text"
          ref="inputRef"
        />
        </div>
        <div class="mb-3">
        <label class="form-label">コミュニティ名</label>
        <validate-input
          :rules="communityNameRules" v-model="communityNameVal"
          placeholder="コミュニティ名を入力してください"
          type="text"
          ref="inputRef"
        />
        </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { defineComponent, PropType, reactive, ref } from 'vue'
// import HelloWorld from './components/HelloWorld.vue'
import PostList, { PostProps } from './components/PostList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
const currentUser: UserProps = {
  isLogin: true,
  name: 'えい',
  id: 3
}
// const currentUser: UserProps = {
//   isLogin: false
// }
const testData: PostProps[] = [
  {
    id: 1,
    title: 'Post1',
    description: 'ここはpost1',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'post2',
    description: 'post2',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3',
    description: 'post3',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 4,
    title: 'post4',
    description: 'post4',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]
export default defineComponent({
  name: 'App',
  components: {
    PostList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup () {
    const inputRef = ref<any>()
    const emailVal = ref('123@test.com')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('123')
    const passwordRules: RulesProp = [
      { type: 'required', message: '请输入密码' }
    ]
    const communityNameVal = ref('ビッチzoon')
    const communityNameRules: RulesProp = [
      { type: 'required', message: 'コミュニティ名を入力してください' }
    ]
    const onFormSubmit = (result: boolean) => {
      console.log('result', result)
    }
    console.log(currentUser)
    return {
      list: testData,
      currentUser,
      inputRef,
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      communityNameRules,
      communityNameVal,
      onFormSubmit
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
