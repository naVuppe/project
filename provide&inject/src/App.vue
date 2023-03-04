<script setup lang="ts">
import { ref, provide } from 'vue'
import Child from './Child.vue'
import numArrToken, { useApp } from './numArrToken'
const { num, numArr, add } = useApp()

// 依赖声明 从这个组件开始 App.vue
// 任何子孙组件 都可以通过 inject，访问到 numArr
// token - 'numArr' - InjectionToken 注入token
provide(numArrToken, { num, numArr, add })
</script>
<template>
  <h2>父组件</h2>
  <div>{{ num }}</div>
  <button @click="add">加一</button>
  <h2>子组件</h2>
  <Child v-for="(item, index) in numArr" :key="item" :index="index"></Child>
</template>