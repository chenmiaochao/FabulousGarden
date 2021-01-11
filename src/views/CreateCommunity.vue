<template>
  <div class="create-post-page">
    <h2>cretae Community</h2>
    <!-- <h4>{{isEditMode ? 'edit Community' : 'cretae Community'}}</h4> -->
    <div v-if="isEditMode">
    <div class="box2">
      <h2><van-icon name="thumb-circle-o" />クリックし画像をぶち込んで！</h2>
    <uploader
      :action="'/post/upload'"
      :beforeUpload="uploadCheck"
      :uploaded="uploadedData"
      @file-uploaded="onFileUploaded"
      class="d-flex align-items-center justify-content-center bg-list text-secondary w-100 my-4"
    >
      <template #loading>
        <div class="spinner-border text-secondary" role="statys">
          <span class="sr-only">ガンバておりますぴえん🥺.🥺.🥺.🥺</span>
        </div>
        <h2>ガンバておりますぴえん🥺.🥺.🥺.🥺</h2>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data" width="500" />
      </template>
    </uploader>dataProps
    </div>
    </div>

    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">コミュニティ名：</label>
        <validate-input
          :rules="communityNameRules" v-model="communityNameVal"
          placeholder="コミュニティ名称を入力してください"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">コミュニティ詳細：</label>
        <validate-input
          rows="10"
          tag="textarea"
          placeholder="コミュニティ詳細を入力してください"
          :rules="contentRules"
          v-model="descriptionVal"
        />
      </div>
      <template #submit>
        <!-- <button class="btn btn-primary btn-large">{{isEditMode ? '更新文章' : '发表文章'}}
</button> -->
        <button class="btn btn-primary btn-large">コミュニティ創生
</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { GlobalDataProps, CommunityProps, ResponseType, ImageProps } from '../store'
import createMessage from '../hooks/createMessage'
import Uploader from '../components/Uploader.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { beforeUploadCheck } from '../helper'
export default defineComponent({
  name: 'CreateCommunity',
  components: {
    ValidateInput,
    ValidateForm,
    Uploader
  },
  setup () {
    const titleVal = ref('')
    const uploadedData = ref()
    const router = useRouter()
    const route = useRoute()
    const imgVal = ref('')
    const isEditMode = !!route.query.id
    const store = useStore<GlobalDataProps>()
    const communityNameVal = ref('ビッチzoon')
    const communityNameRules: RulesProp = [
      { type: 'required', message: 'コミュニティ名を入力してください' }
    ]
    const descriptionVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: 'コミュニティ詳細を入力してください' }
    ]
    onMounted(() => {
      if (isEditMode) {
        console.log('route.query.id', route.query.id)
        store.dispatch('fetchCommunity', route.query.id).then((rawData: ResponseType<CommunityProps>) => {
          const currentCommunity = rawData.data
          if (currentCommunity.avatar) {
            uploadedData.value = { data: currentCommunity.avatar }
          }
          communityNameVal.value = currentCommunity.communityName
          descriptionVal.value = currentCommunity.description || ''
        })
      }
    })

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
    const onFormSubmit = (result: boolean) => {
      if (result) {
        if (store.state.user._id) {
          const newCommunity: CommunityProps = {
            communityName: communityNameVal.value,
            description: descriptionVal.value,
            author: store.state.user._id
          }
          store.dispatch('createCommunity', newCommunity).then(data => {
            store.dispatch('fetchCommunities')
            store.dispatch('fetchEvents')
            createMessage('成功２秒後 新規コミュニティへ飛ばし', 'success')
            setTimeout(() => {
              router.push(`/community/${data.data._id}`)
            }, 2000)
          }).catch(e => {
            console.log(e)
          })
        }
      }
    }

    return {
      descriptionVal,
      contentRules,
      communityNameRules,
      communityNameVal,
      onFormSubmit,
      isEditMode,
      uploadedData,
      onFileUploaded,
      uploadCheck
    }
  }
})
</script>
