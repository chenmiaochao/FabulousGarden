import { ref, onMounted, onUnmounted, Ref } from 'vue'
// 目标 点解页面非下拉菜单时 收起下拉菜单
// 实现逻辑是 获取点击内容 判断是否为下拉菜单内容 && isOpen

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    // node.contains判断传入的节点是不是该节点的子节点
    // e.target进行类型断言,点击的内容一定是html node

    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.addEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside
