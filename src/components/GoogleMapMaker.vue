<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class GoogleMapMarker extends Vue {
  @Prop() private google!: any
  @Prop() private map!: any
  @Prop() private position!: { lat: number; lng: number }
  @Prop() private title!: string
  marker: any
  infoWindow: any

  mounted () {
    const { Marker } = this.google.maps
    this.marker = new Marker({
      position: this.position,
      map: this.map
    })
    this.infoWindow = new this.google.maps.InfoWindow({
      content: `<div>${this.title}<div>`
    })
    this.google.maps.event.addListener(this.marker, 'click', () => {
      this.infoWindow.open(this.map, this.marker)
    })
  }
}
</script>
