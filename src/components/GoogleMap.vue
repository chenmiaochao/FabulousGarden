<template>
<GmapMap
  :center="{lat:10, lng:10}"
  :zoom="7"
  map-type-id="terrain"
  style="width: 500px; height: 300px"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />
</GmapMap>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import qs from 'query-string'
import apiKey from '../../apiKey.json'
const params = {
  key: apiKey.googleApi,
  libraries: 'geometry,drawing,places',
  callback: 'handleLoadGoogleMapsScript'
}

interface GoogleMapWindow extends Window {
  handleLoadGoogleMapsScript: Function;
  google: any;
}

declare const window: GoogleMapWindow

@Component
export default class GoogleMap extends Vue {
  @Prop() private zoom!: number
  @Prop() private center!: { lat: number; lng: number }
  @Prop({ default: '240px' }) private height!: string
  google: any = null
  map: any = null

  mounted () {
    this.loadGoogleMapsScript().then(google => {
      this.google = google
      this.initializeMap()
    })
  }

  loadGoogleMapsScript () {
    return new Promise((resolve, reject) => {
      if (window.google) {
        return resolve(window.google)
      }
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?${qs.stringify(
        params
      )}`
      const head = document.querySelector('head')
      if (!head) return reject(new Error('head node is undefined'))
      head.appendChild(script)
      window.handleLoadGoogleMapsScript = () => {
        resolve(window.google)
      }
      setTimeout(() => {
        if (!window.google) {
          reject(new Error('failed load google api'))
        }
      }, 5000)
    })
  }

  initializeMap () {
    const mapContainer = this.$el.querySelector('#googleMap')
    const { Map, MapTypeId } = this.google.maps
    this.map = new Map(mapContainer, {
      zoom: this.zoom,
      center: this.center,
      mapTypeId: MapTypeId.ROADMAP
    })
  }
}
</script>
