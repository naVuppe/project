<script setup>
import { ref } from 'vue'

const droped = ref(false)

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
</script>
<template>
    <div class="block" draggable="true" @dragstart="dragStart" v-if="!droped"></div>
    <!-- 拖的区域 -->
    <!-- 放的区域 -->
    <div class="container" @dragover="dragover" @drop="drop">
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
