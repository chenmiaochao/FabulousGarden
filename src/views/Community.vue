<template>
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
export default defineComponent({
  name: 'Community',
  components: {
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
    return {
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
