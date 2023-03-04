<script setup lang="ts">
import { inject, ref } from 'vue'
import numArrToken, { useApp } from './numArrToken';
// import { numArr } from './test'
// 子组件展示 num 并实时响应
// 子组件不能脱离父组件存在 vuex/vue3 顶层 reactive
// 参数层层传递，非常麻烦
// 在小项目中，问题（子组件耦合，传递繁琐）不严重
const props = defineProps({
    index: {
        type: Number,
        default: 0
    }
})
const { numArr } = inject(numArrToken, useApp()) // 可能从父组件 父组件的父组件
// 如果依赖注入没有值，就用 ref([])
const content = numArr.value[props.index]
</script>

<template>
    <div>{{ numArr[props.index] }}</div>
    <button @click="numArr[props.index]++">加一</button>
</template>