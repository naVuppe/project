<script setup>
import { ref } from 'vue'

const arr = ref([1, 2, 3, 4, 5])
const dragstart = (e, index) => {
    // index 我们正在拖的节点，是由数组的哪一个下标渲染出来的 
    // origin 源头
    console.log('拖', index)
    e.dataTransfer.setData('text/plain', index)
}
const dragover = (e, index) => {
    e.preventDefault()
    // index 放置的节点的index
    // target 目标
}
const drop = (e, target) => {
    e.preventDefault()
    // index 放置的节点的index
    // target
    console.log('放', target)
    // 如何获取 origin？
    const keyStr = e.dataTransfer.getData('text/plain')
    const origin = parseInt(keyStr)
    // 数组的操作
    console.log('要操作的', origin, target)
    // origin 拖 0  target 放 4
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
</script>



<template>
    <div class="container" ref="container">
        <div class="block" v-for="(item, index) in arr" draggable="true" @dragstart="dragstart($event, index)"
            @dragover="dragover($event, index)" @drop="drop($event, index)">
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

/* 
.move {
    position: fixed;
    left: v-bind(x);
    top: v-bind(y);
} */
</style>
