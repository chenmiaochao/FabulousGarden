<template>
  <sidebar-menu :menu="menu" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import store from '../store'
import { SidebarMenu } from 'vue-sidebar-menu'
export interface CommunityProps{
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export default defineComponent({
  name: 'SideBarCommunityList',
  props: {
    list: {
      type: Array as PropType<CommunityProps[]>,
      required: true
    }
  },
  components: {
    SidebarMenu
  },
  setup (props) {
    const menu: any = ref('')
    menu.value = [{
      header: true,
      title: 'Main Navigation',
      hiddenOnCollapse: true
    }]
    const comList = ref(props.list)
    console.log(comList.value)
    for (const com of comList.value) {
      let com1: any = JSON.stringify(com)
      com1 = JSON.parse(com1)
      const href: any = '/community/' + com1._id
      const title: any = com1.title
      const obj = {
        href: href,
        title: title,
        icon: 'fa fa-user'
      }
      menu.value.push(obj)
    }
    // console.log('menu------new ', menu.value)
    return {
      menu
    }
  }
})
</script>
