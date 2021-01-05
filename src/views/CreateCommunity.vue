<template>
  <div class="create-post-page">
    <h2>cretae Community</h2>
    <!-- <h4>{{isEditMode ? 'edit Community' : 'cretae Community'}}</h4> -->
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
          v-model="contentVal"
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
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { GlobalDataProps, CommunityProps } from '../store'
import createMessage from '../hooks/createMessage'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
export default defineComponent({
  name: 'CreateCommunity',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const titleVal = ref('')
    const router = useRouter()
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    // const inputRef = ref<any>()
    const communityNameVal = ref('ビッチzoon')
    const communityNameRules: RulesProp = [
      { type: 'required', message: 'コミュニティ名を入力してください' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: 'コミュニティ詳細を入力してください' }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        if (store.state.user.name) {
          const newCommunity: CommunityProps = {
            communityName: communityNameVal.value,
            description: contentVal.value,
            author: store.state.user.name
          }
          // store.commit('createCommunity', newCommunity)
          // router.push('/')
          store.dispatch('createCommunity', newCommunity).then(data => {
            console.log(data)
            store.dispatch('fetchCommunities')
            store.dispatch('fetchEvents')
            createMessage('成功２秒後 新規コミュニティへ飛ばし', 'success')
            setTimeout(() => {
              router.push(`/community/${data.data}`)
            }, 2000)
          }).catch(e => {
            console.log(e)
          })
        }
      }
    }

    return {
      contentVal,
      contentRules,
      communityNameRules,
      communityNameVal,
      onFormSubmit
    }
  }
})
</script>
