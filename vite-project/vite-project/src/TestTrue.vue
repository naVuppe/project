<script setup>
import { ref, reactive } from 'vue'

const divRef = ref(null)
const containerRef = ref(null)
const droped = ref(false)
// 是否在拖拽
const dragging = ref(false)
const pos = reactive({
    x: 0,
    y: 0
})
const pian = reactive({
    x: 0,
    y: 0
})

// 原生事件实现
const dragStart = (e) => {
    // 放数据进去
    console.log('sdfsdf')
    // 只有拖拽开始的时候才能设置数据
    e.dataTransfer.setData('text/plain', 'hahahhahaahhaah')
    // 携带拖拽的是哪一个
}
const dragover = (e) => {
    // 有东西拖拽到你的上方了
    e.preventDefault()
}
const drop = (e) => {
    // 放下了
    e.preventDefault()
    droped.value = true
    // 拿数据出来
    const data = e.dataTransfer.getData('text/plain')
    console.log(data)
}
// 用 mousedown mousemove mouseup/mouseleave
// 用鼠标事件替代掉原生的拖放
// 没有按下鼠标之前，只需要监听 mousedown

// 1. 对拖拽元素和放置元素都进行  命中检测
// 2. 鼠标的 clientX/Y 元素的 getBoundingClientRect()
// 3. mousemove,mouseup,mouseleave 在拖拽命中后监听
// 4. mousemove,mouseup,mouseleave 在放置命中后取消监听
// 5. transform: translate(鼠标位置-偏移量) 移动的绑定
document.addEventListener('mousedown', (e) => {
    // 开始拖拽
    dragging.value = true
    // 鼠标所在位置，直接在鼠标事件上
    console.log('dragStart', e.clientX, e.clientY)
    console.log(divRef.value)
    // getBoundingClientRect 获取元素的位置（相对于视口）和大小
    const rect = divRef.value.getBoundingClientRect()
    console.log(rect)
    // {x,y 相对于视口的坐标，鼠标坐标对应，width,height 元素的宽高}
    // 计算出，鼠标正好点在元素上
    if (e.clientX > rect.x && e.clientX < (rect.x + rect.width) && e.clientY > rect.y && e.clientY < rect.y + rect.height) {
        // 命中检测
        console.log('命中')
        pian.x = e.clientX - rect.x
        pian.y = e.clientY - rect.y
        const handleMove = (e) => {
            console.log('move', e.clientX, e.clientY)
            pos.x = e.clientX
            pos.y = e.clientY
        }
        document.addEventListener('mousemove', handleMove)
        const handleDrop = (e) => {
            // 拖拽结束
            dragging.value = false
            const rect = containerRef.value.getBoundingClientRect()
            if (e.clientX > rect.x && e.clientX < (rect.x + rect.width) && e.clientY > rect.y && e.clientY < (rect.y + rect.height)) {
                // 命中了放置区域
                console.log('命中放置区域')
                // 修改数据
                droped.value = true
            }
            console.log('drop', e.clientX, e.clientY)
            document.removeEventListener('mousemove', handleMove)
            document.removeEventListener('mouseup', handleDrop)
            document.removeEventListener('mouseleave', handleDrop)
        }
        document.addEventListener('mouseup', handleDrop)
        document.addEventListener('mouseleave', handleDrop)
    }


})
</script>
<template>
    <div class="block" v-if="!droped" ref="divRef"
        :style="{ transform: dragging ? `translate(${pos.x - pian.x}px,${pos.y - pian.y}px)` : '' }"></div>
    <!-- 拖的区域 -->
    <!-- 放的区域 -->
    <div class="container" ref="containerRef">
        <div class="block" v-if="droped"></div>
    </div>
</template>
<style scoped>
.block {
    width: 100px;
    height: 100px;
}

.container {
    margin-top: 20px;
    width: 400px;
    height: 400px;
    background-color: hsl(220, 40%, 40%);
}
</style>
