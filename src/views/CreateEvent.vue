/* eslint-disable @typescript-eslint/camelcase */
<template>
  <div class="create-post-page">
    <h1>cretae Event</h1>
    <!-- <h4>{{isEditMode ? 'edit Event' : 'cretae Event'}}</h4> -->
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

    <div class="box2">
      <van-checkbox-group v-model="checked">
        <h2><van-icon name="thumb-circle-o" />クリックし、コミュニティを選択しよう</h2>
        <van-cell-group :title="''">
          <van-cell
            v-for="(item) in communities"
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
    <van-divider
      :style="{ color: '#00ff7f', borderColor: '#ffffff', padding: '0 16px' }"
    />

    <validate-form @form-submit="onFormSubmit">
      <div class="box2">
        <div class="mb-3">
          <van-icon name="thumb-circle-o" />
          <label class="form-label">イベント名：</label>
          <validate-input
            :rules="eventNameRules" v-model="eventNameVal"
            placeholder="イベント名称を入力してください"
            type="text"
          />
        </div>
        <van-divider
        :style="{ color: '#00ff7f', borderColor: '#00ff7f', padding: '0 16px' }"
        />
        <div>
        <van-icon name="thumb-circle-o" />
          <label class="form-label">イベント年月日を選んでください</label>
          <van-datetime-picker
            v-model="currentDate"
            cancel-button-text=" "
            confirm-button-text=" "
            type="date"
            title=""
            :min-date="minDate"
            :max-date="maxDate"
          />
        </div>
        <van-divider
        :style="{ color: '#00ff7f', borderColor: '#00ff7f', padding: '0 16px' }"
        />
        <div class="mb-3">
          <van-icon name="thumb-circle-o" />
          <label class="form-label">イベント詳細：</label>
          <validate-input
            rows="10"
            tag="textarea"
            placeholder="イベント詳細を入力してください"
            :rules="contentRules"
            v-model="contentVal"
          />
        </div>
      </div>
      <van-divider
        :style="{ color: '#00ff7f', borderColor: '#00ff7f', padding: '0 16px' }"
      />

      <div class="box2">
        <div class="mt-3 mb-3">
        <h2 class="mt-1 mb-1">イベント場所 选择/入力</h2>
        <div class="d-flex justify-content-center mt-4 mb-4">
          <van-radio-group v-model="placeChecked">
            <van-radio name="1">
              場所を選択
              <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>
            </van-radio>
            <van-radio name="2">
              場所を検索
              <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>
            </van-radio>
                    <van-radio name="3">
              場所を入力
              <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>
            </van-radio>
          </van-radio-group>
        </div>
        </div>
        <van-divider
          :style="{ color: '#00ff7f', borderColor: '#00ff7f', padding: '0 16px' }"
        />
        <div class="mt-3 mb-3" v-if="placeChecked =='1'">
          <van-area
            title="イベント場所：選択"
            :area-list="areaList"
            :columns-placeholder="['選びましょう', '選びましょう', '選びましょう']"
            cancel-button-text=" "
            @confirm="onAddrConfirm"
          >
          </van-area>
          <div v-if="haveHotelData" >
          <van-divider
            :style="{ color: '#00ff7f', borderColor: '#00ff7f', padding: '0 16px' }"
          />
          <!-- <pre>{{console.log(markers)}}</pre> -->
          <GoogleMap
              :apiKey="apiKey"
              libraries="geometry,drawing,places"
              :options="{
                center: markers.value[0].position,
                zoom: 13,
              }"
              :markers="markers.value"
            />
            <van-divider
              :style="{ color: '#00ff7f', borderColor: '#00ff7f', padding: '0 16px' }"
            />
            <label class="form-label">クリックして選択ぴえん</label>
            <div v-for="(item) in hotels.value.data" :key="item">
            <van-card
              :price="item.HotelName[0]"
              :desc="item.HotelCaption[0]"
              :thumb="item.PictureURL[0]"
              @click="onClickHotel(item)"
            />
            </div>
          </div>
        <van-divider
          :style="{ color: '#00ff7f', borderColor: '#00ff7f', padding: '0 16px' }"
        />
        </div>

        <div class="mb-3 mt-3">
          <label class="form-label">イベント場所：</label>
          <validate-input
            rows="10"
            placeholder="イベント場所を入力してください"
            :rules="placeRules"
            v-model="placeVal"
          >
          </validate-input>
        <div class="mb-3 mt-3" v-if="placeChecked =='2'">
          <button @click.prevent="onClickPlaceSearch(placeVal)"
            class="btn btn-secondary btn-large"
          >
          場所検索 selectAddrs
          </button>
        </div>
        <div v-if="placeChecked =='2'">
        <van-divider
          :style="{ color: '#00ff7f', borderColor: '#00ff7f', padding: '0 16px' }"
        />
          <p>クリックして選択ぴえん</p>
          <div v-for="(add) in selectAddrs.data" :key="add">
            <van-cell
              center
              :title="add['text']"
              :label="add['address']"
              @click.prevent="onClickAddr(add)"
              icon="location-o"
            />
          </div>
        <van-divider
          :style="{ color: '#00ff7f', borderColor: '#00ff7f', padding: '0 16px' }"
        />
        </div>
        </div>
        <van-divider
          :style="{ color: '#00ff7f', borderColor: '#00ff7f', padding: '0 16px' }"
        />
      </div>
      <div class="mb-3 box2">
        <label class="form-label">イベント料金：</label>
        <validate-input
          rows="10"
          placeholder="イベント料金を入力してください"
          :rules="priceRules"
          v-model="priceVal"
        />
      </div>
      <template #submit>
        <!-- <button class="btn btn-primary btn-large">{{isEditMode ? '更新文章' : '发表文章'}}
</button> -->
        <button class="btn btn-primary btn-large">イベント創生
</button>
      </template>
    </validate-form>
  </div>
  <h1>helloooooo</h1>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch, resolveComponent, unref, isRef, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { GlobalDataProps, EventProps, ResponseType, ImageProps } from '../store'
import Uploader from '../components/Uploader.vue'
import { beforeUploadCheck } from '../helper'
import createMessage from '../hooks/createMessage'
import { GoogleMap } from 'google-map-ts-vue3'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import areaList from '../../jalanPrefecure.json'
import apiKey from '../../apiKey.json'
import axios from 'axios'
export default defineComponent({
  name: 'CreateEvent',
  components: {
    ValidateInput,
    ValidateForm,
    GoogleMap,
    Uploader
  },
  setup () {
    const titleVal = ref('')
    const router = useRouter()
    const route = useRoute()
    const uploadedData = ref()
    const imgVal = ref('')
    const isEditMode = !!route.query.id
    const store = useStore<GlobalDataProps>()
    const eventNameVal = ref('ビッチevent')
    const eventNameRules: RulesProp = [
      { type: 'required', message: 'イベント名を入力してください' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: 'イベント詳細を入力してください' }
    ]
    const placeVal = ref('')
    const placeRules: RulesProp = [
      { type: 'required', message: 'イベント場所を入力または選択してください' }
    ]
    const priceVal: any = ref('')
    const priceRules: RulesProp = [
      { type: 'required', message: 'イベント料金を入力してください' }
    ]
    const communityVal = ref('')
    // 時間選択
    const currentDate = ref(new Date('YYYY/MM/DD'))
    // 場所入力3択結果
    const placeChecked = ref('3')
    // コミュニティクリック
    const isComClicked = ref(false)
    const toggle = (_id: any) => {
      if (isComClicked.value) {
        isComClicked.value = false
        return
      }
      isComClicked.value = _id
      communityVal.value = _id
    }
    onMounted(() => {
      store.dispatch('fetchCommunities')
      if (isEditMode) {
        console.log('route.query.id', route.query.id)
        store.dispatch('fetchEvent', route.query.id).then((rawData: ResponseType<EventProps>) => {
          const currentEvent = rawData.data
          if (currentEvent.avatar) {
            uploadedData.value = { data: currentEvent.avatar }
            imgVal.value = currentEvent.avatar
          }
          eventNameVal.value = currentEvent.eventName
          contentVal.value = currentEvent.description
          if (currentEvent.place) {
            placeVal.value = currentEvent.place || ''
          }
          priceVal.value = currentEvent.price
          // currentDate.value = currentEvent.date
          communityVal.value = currentEvent.community
          toggle(currentEvent.community)
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
    store.dispatch('fetchCommunities')
    const communities = computed(() => store.state.communities)

    // 選択の戻り値
    const hotels = ref()
    const markers = ref()
    const haveHotelData = ref(false)
    const onAddrConfirm = (data: []) => {
      store.dispatch('fetchHotel', data).then(res => {
        // console.log(res)
        hotels.value = computed(() => store.state.hotels)
        if (hotels.value) {
          haveHotelData.value = true
        }
      }).catch(e => {
        createMessage('エラー', 'error')
      })
      store.dispatch('fetchHotelAndMarkers', data).then(res => {
        // console.log(res)
        markers.value = computed(() => store.state.markers)
      })
    }

    /**
     * hotelをクリック
     * 場所選び
     */
    const selectHotel = ref('')
    const onClickHotel = (item: any) => {
      placeVal.value = item.HotelName[0] + item.HotelAddress[0]
      // console.log('placeVal', placeVal.value)
    }
    /**
     * 場所検索
     */
    const selectAddrs = ref([])
    const onClickPlaceSearch = () => {
      axios.get('/event/yahooGeoAddr', { params: { params: placeVal.value } }).then(data => {
        console.log(data.data)
        selectAddrs.value = data.data
      })
    }
    const onClickAddr = (add: any) => {
      placeVal.value = add.text + add.address
      // console.log('placeVal', placeVal.value)
    }
    watch(() => selectAddrs.value, () => {
      console.log(selectAddrs.value)
    })

    /**
     * コミュニティをクリック
     * コミュニティ選び
     */
    watch(() => priceVal, () => {
      priceVal.value = +priceVal.value
    })
    const checked = ref([])
    const checkboxRefs = ref([])

    const onFormSubmit = (result: boolean) => {
      if (result) {
        if (store.state.user._id) {
          const newEvent: EventProps = {
            avatar: imgVal.value,
            eventName: eventNameVal.value,
            description: contentVal.value,
            author: store.state.user._id,
            date: currentDate.value,
            place: placeVal.value,
            price: priceVal.value,
            community: communityVal.value
          }
          const actionName = isEditMode ? 'updateEvent' : 'createEvent'
          const sendData = isEditMode ? {
            id: route.query.id,
            payload: newEvent
          } : newEvent
          store.dispatch(actionName, sendData).then(data => {
          // store.dispatch('createEvent', newEvent).then(data => {
            store.dispatch('fetchEvents')
            createMessage('成功２秒後 新規コミュニティへ飛ばし', 'success')
            setTimeout(() => {
              router.push(`/community/${data.data.community}/${data.data._id}`)
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
      eventNameRules,
      eventNameVal,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2023, 10, 1),
      currentDate,
      placeVal,
      placeRules,
      placeChecked,
      priceVal,
      priceRules,
      onFormSubmit,
      communities,
      checked,
      checkboxRefs,
      toggle,
      isComClicked,
      activeIcon: 'https://img.yzcdn.cn/vant/user-active.png',
      inactiveIcon: 'https://img.yzcdn.cn/vant/user-inactive.png',
      areaList,
      onAddrConfirm,
      onClickAddr,
      hotels,
      markers,
      haveHotelData,
      onClickHotel,
      selectHotel,
      selectAddrs,
      onClickPlaceSearch,
      apiKey: apiKey.googleApi,
      isEditMode,
      uploadedData,
      onFileUploaded,
      uploadCheck
    }
  }
})
</script>

<style scoped>
.clicked{
  border: 4mm ridge rgba(170, 50, 220, .6);
  background-color: aliceblue;
}
.img-icon {
  height: 20px;
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
h2 {
  padding: 0.5em;/*文字周りの余白*/
  color: #494949;/*文字色*/
  background: #fffaf4;/*背景色*/
  border-left: solid 5px #ffaf58;/*左線（実線 太さ 色）*/
}
</style>
