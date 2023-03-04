<script setup>
import { onMounted, ref, reactive, computed } from 'vue'
const container = ref(null)
const list = ref([])
const arr = ref([1, 2, 3, 4, 5])

// 当前指针位置
const pos = reactive({ x: 0, y: 0 })
const box = reactive({ x: 0, y: 0 })
// 正在拖的元素 index
let dragIndex = ref(-1)

const checkPosRect = (rect, pos) => {
  if (rect.x < pos.x && rect.y < pos.y && (rect.x + rect.width) > pos.x && (rect.y + rect.height) > pos.y) {
    return true
  }
  return false
}
onMounted(() => {
  container.value.addEventListener('mousedown', (e) => {
    pos.x = e.clientX
    pos.y = e.clientY
    for (let key in list.value) {
      const rect = list.value[key].getBoundingClientRect()
      if (checkPosRect(rect, pos)) {
        dragIndex.value = parseInt(key)
        box.x = e.clientX - rect.x
        box.y = e.clientY - rect.y
      }
    }
    const handleMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
    }
    container.value.addEventListener('mousemove', handleMove)
    const handleDrop = () => {
      container.value.removeEventListener('mousemove', handleMove)
      container.value.removeEventListener('mouseup', handleDrop)
      container.value.removeEventListener('mouseleave', handleDrop)
      for (let key in list.value) {
        // 不处理正在拖拽的元素
        if (key === dragIndex) return
        const rect = list.value[key].getBoundingClientRect()
        if (checkPosRect(rect, pos)) {
          console.log('-----------------')
          if (dragIndex.value === -1) return
          console.log('拖拽的 index', dragIndex.value)
          console.log('放置的 index', key)
          const origin = dragIndex.value
          const target = parseInt(key)
          if (origin < target) {
            // 小的拖到大的
            // 4 0
            // [1,2,3,4,5]
            arr.value.splice(target + 1, 0, arr.value[origin])
            // [1,2,3,4,5,1]
            // [1, 5, 2, 3, 4, 5]
            arr.value.splice(origin, 1)
            // [2,3,4,5,1]
            // [1,5,2,4,5]
          } else {
            // 大的拖到小的
            const temp = arr.value[origin]
            arr.value.splice(origin, 1)
            arr.value.splice(target, 0, temp)
          }
        }
      }
      dragIndex.value = -1
    }
    container.value.addEventListener('mouseup', handleDrop)
    container.value.addEventListener('mouseleave', handleDrop)
  })
})

const x = computed(() => pos.x - box.x + 'px')
const y = computed(() => pos.y - box.y + 'px')

const send = () => {
  window.electronAPI.send('from browser')
}
</script>

<template>
  <button @click="send">发送</button>
  <div class="container" ref="container">
    <div class="block" v-for="(item, index) in arr" ref="list" :class="dragIndex === index ? 'move' : ''">
      <div>第{{ item }}个</div>
    </div>
  </div>
</template>

<style>
.container {
  background-color: hsl(220, 40%, 90%);
  width: 300px;
  padding: 1em;
}

.block {
  background-color: white;
  margin-bottom: 1em;
  width: 200px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  color: black;
  user-select: none;
}

.move {
  position: fixed;
  left: v-bind(x);
  top: v-bind(y);
  box-shadow: 0 0 10px 0 hsl(220, 40%, 80%);
}
</style>