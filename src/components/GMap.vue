<template>
  <div class="map" ref="mapDivRef"></div>
</template>

<script lang="ts">
import { ref, onBeforeMount, defineComponent } from 'vue'
import {} from '@ionic/vue'
export default defineComponent({
  setup () {
    // googlemap obj
    const map = ref(null)
    // the map element in the template
    const mapDivRef = ref(null)
  }
})
</script>
