/* eslint-disable vue/no-parsing-error */
<template>
  <div class="create-post-page">
    <!-- <h4>{{isEditMode ? '编辑文章' : '新建文章'}}</h4> -->
    <h4>POST</h4>
    <div class="box2">
      <h2><van-icon name="thumb-circle-o" />クリックし画像をぶち込んで！</h2>
      <uploader
      :action="'/post/upload'"
      :beforeUpload="uploadCheck"
      :uploaded="uploadedData"
      @file-uploaded="onFileUploaded"
      :imgRules="imgRules"
      class="d-flex align-items-center justify-content-center bg-list text-secondary w-100 my-4"
    >
      <template #loading>
        <div class="spinner-border text-secondary" role="statys">
          <span class="sr-only">ガンバておりますぴえん🥺.🥺.🥺.🥺</span>
        </div>
        <h2>ガンバておりますぴえん🥺.🥺.🥺.🥺</h2>
      </template>
      <template #uploaded="dataProps">
        <img  v-if="isEditMode" :src="dataProps.uploadedData.data" width="500" />

        <img :src="dataProps.uploadedData.data.imgUrl" width="500" />
      </template>
    </uploader>
    </div>

    <div class="box2">
      <van-checkbox-group v-model="checked">
          <h2><van-icon name="thumb-circle-o" />クリックし、コミュニティを選択しよう</h2>
          <van-cell-group :title="''">
            <van-cell
              v-for="(item) in communitiesWithEvents"
              clickable
              :key="item"
              @click="toggle(item._id)"
              :class="isComClicked == item._id ? 'clicked':''"
            >
            <template #icon>
              <van-image :src="item.avatar"
                width="5rem"
                height="5rem"
                fit="contain"
                round
              />
            </template>
            <template #title>
              {{item.title}}
            </template>
            <template #label>
              {{item.description}}
            </template>
            </van-cell>
          </van-cell-group>
      </van-checkbox-group>
    </div>
    <div :class="{ box2 : isComClicked }">
      <van-checkbox-group v-model="checked" v-if="isComClicked">

        <h2><van-icon name="thumb-circle-o" />クリックし、イベントを選択しよう</h2>
        <van-cell-group :title="''">
          <van-cell
            v-for="(item) in communitiesWithEvents.find(c => c._id === isComClicked).events"
            clickable
            :key="item"
            :title="item.title"
            @click="toggleEvent(item._id)"
            :class="isEventClicked == item._id ? 'clicked-event':''"
          >
          <template #icon>
            <van-image :src="item.avatar"
              width="5rem"
              height="5rem"
              fit="contain"
              round
            />
          </template>
          <template #title>
            {{item.title}}
          </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>

    <div class="box2">
      <validate-form @form-submit="onFormSubmit">
        <div class="mb-3">
          <label class="form-label">文章标题：</label>
          <validate-input
            :rules="titleRules" v-model="titleVal"
            placeholder="请输入文章标题"
            type="text"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">文章详情：</label>
          <validate-input
            rows="10"
            tag="textarea"
            placeholder="请输入文章详情"
            :rules="contentRules"
            v-model="contentVal"
          />
        </div>
        <template #submit>
          <!-- <button class="btn btn-primary btn-large">{{isEditMode ? '更新文章' : '发表文章'}}
  </button> -->
          <button class="btn btn-primary btn-large">发表文章
  </button>
        </template>
      </validate-form>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, onBeforeMount, onBeforeUpdate } from 'vue'
import { Checkbox, CheckboxGroup } from 'vant'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { GlobalDataProps, PostProps, ImageProps, ResponseType } from '../store'
import axios from 'axios'
import { beforeUploadCheck } from '../helper'
import Uploader from '../components/Uploader.vue'
import createMessage from '../hooks/createMessage'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateInput,
    ValidateForm,
    Uploader
  },
  setup () {
    const titleVal = ref('')
    const router = useRouter()
    const route = useRoute()
    const isEditMode = !!route.query.id
    const store = useStore<GlobalDataProps>()
    // community event list 取得
    onMounted(() => {
      store.dispatch('fetchCommunitiesWithEvents')
      // console.log('3')
    })
    onBeforeMount(() => {
      store.dispatch('fetchCommunitiesWithEvents')
      // console.log('2')
    })
    store.dispatch('fetchCommunitiesWithEvents')
    const communitiesWithEvents = computed(() => store.state.communities)
    // console.log('1', communitiesWithEvents.value)

    const checked = ref([])
    const checkboxRefs = ref([])
    const isComClicked = ref(false)
    const isEventClicked = ref(false)
    const communityVal = ref('')
    const eventVal = ref('')
    const uploadedData = ref()
    const contentVal = ref('')
    const imgVal = ref('')

    // clickし、communityId取得,選択されたclassを追加
    const toggle = (_id: any) => {
      // console.log(_id)
      if (isComClicked.value) {
        isComClicked.value = false
        return
      }
      isComClicked.value = _id
      communityVal.value = _id
    }
    const toggleEvent = (_id: any) => {
      // console.log(_id)
      if (isEventClicked.value) {
        isEventClicked.value = false
        return
      }
      isEventClicked.value = _id
      eventVal.value = _id
    }
    onBeforeUpdate(() => {
      checkboxRefs.value = []
    })
    onMounted(() => {
      if (isEditMode) {
        store.dispatch('fetchPost', route.query.id).then((rawData: ResponseType<PostProps>) => {
          const currentPost = rawData.data
          if (currentPost.image) {
            uploadedData.value = { data: currentPost.image }
          }
          titleVal.value = currentPost.title
          if (currentPost.content) {
            contentVal.value = currentPost.content
          }
          if (currentPost.image) {
            imgVal.value = currentPost.image
          }
          if (currentPost.community) {
            communityVal.value = currentPost.community
            toggle(currentPost.community)
          }
          if (currentPost.event) {
            eventVal.value = currentPost.event
            toggleEvent(currentPost.event)
          }
        })
      }
    })
    // rules
    const titleRules: RulesProp = [
      { type: 'required', message: 'タイトルはからでは行けません' }
    ]
    const contentRules: RulesProp = [
      { type: 'required', message: '文章はからでは行けません' }
    ]
    const imgRules: RulesProp = [
      { type: 'required', message: '画像はからでは行けません' }
    ]
    // upload check & getImgUrl
    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 5 })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('格式不正确,只能是jpg和png', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过1Mb', 'error')
      }
      return passed
    }
    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      // console.log(rawData)
      if (rawData.data.imgUrl) {
        imgVal.value = rawData.data.imgUrl
      }
      // console.log(imgVal.value)
      createMessage('上传图片成功', 'success')
    }
    // submit
    // check is already select Com and Event
    const selectComAndEve = () => {
      if (isComClicked.value && isEventClicked.value) {
        // console.log(isComClicked.value && isEventClicked.value)
        alert('isComClicked.value' + isComClicked.value + 'isEventClicked.value' + isEventClicked.value)
        return true
      }
      createMessage('コミュニティまたはイベントが選択していない', 'error', 2000)
      return false
    }
    const onFormSubmit = (result: boolean) => {
      // console.log('first 突破')
      if (result && selectComAndEve) {
        // console.log('hi')
        const newPost: PostProps = {
          author: store.state.user._id,
          title: titleVal.value,
          content: contentVal.value,
          image: imgVal.value,
          community: communityVal.value,
          event: eventVal.value,
          createdAt: new Date().toLocaleString(),
          createdAtMonth: new Date().toLocaleString().split('/')[1]
        }
        store.dispatch('createPost', newPost).then(data => {
          console.log(data)
          store.dispatch('fetchPosts')
          createMessage('成功２秒後 topへ飛ばし', 'success')
          setTimeout(() => {
            router.push(`/community/${data.data.community}/${data.data.event}/${data.data._id}`)
          }, 2000)
        }).catch(e => {
          console.log(e)
        })
      }
    }
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      imgVal,
      imgRules,
      onFormSubmit,
      onFileUploaded,
      uploadCheck,
      communitiesWithEvents,
      list: ['a', 'b'],
      checked,
      checkboxRefs,
      toggle,
      toggleEvent,
      isEditMode,
      isComClicked,
      isEventClicked,
      selectComAndEve,
      uploadedData
    }
  }
})
</script>
<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
.clicked{
  border: 4mm ridge rgba(170, 50, 220, .6);
  background-color: aliceblue;
}
.clicked-event{
  border: 4mm ridge rgba(50, 220, 183, 0.6);
  background-color: aliceblue;
}
.box2 {
    padding: 0.5em 1em;
    margin: 2em 0;
    font-weight: bold;
    color: #6091d3;/*文字色*/
    background: #FFF;
    border: solid 3px #6091d3;/*線*/
    border-radius: 10px;/*角の丸み*/
}
</style>
