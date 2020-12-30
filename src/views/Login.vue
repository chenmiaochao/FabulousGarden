<template>
<div>
  <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">电子邮箱</label>
        <validate-input
          :rules="emailRules" v-model="emailVal"
          placeholder="しもしもメーアドよこしな"
          type="text"
          ref="inputRef"
        />
        {{emailVal}}
        </div>
        <div class="mb-3">
          <label class="form-label">密码</label>
          <validate-input
            :rules="passwordRules"
            v-model="passwordVal"
            placeholder="しもしもパスワードよこしな"
            type="password"
          />
        </div>
        <template #submit>
          <span class="btn btn-danger">Submit</span>
        </template>
    </validate-form>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import createMessage from '../hooks/createMessage'
import router from '@/router'
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    // const inputRef = ref<any>()
    const route = useRouter()
    const store = useStore()
    const emailVal = ref('111@test.com')
    const emailRules: RulesProp = [
      { type: 'required', message: 'メールアドレスは空じゃん、あかんで' },
      { type: 'email', message: '正確なメルアドを入力セー' }
    ]
    const passwordVal = ref('111')
    const passwordRules: RulesProp = [
      { type: 'required', message: 'しもしもパスワードよこしな' }
    ]

    const onFormSubmit = (result: boolean) => {
      console.log('result', result)
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndFetch', payload).then(data => {
          createMessage('成功　２秒後 topへ飛ばし', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }).catch(e => {
          console.log(e)
        })
      }
    }
    return {
      emailRules,
      passwordRules,
      emailVal,
      passwordVal,
      onFormSubmit
    }
  }
})
</script>
