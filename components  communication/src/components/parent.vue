<script setup lang="ts">
import Child from './child.vue'
import {ref} from 'vue'

const show = ref(false)

</script>

<template>
    <button @click="$event => show = !show" v-if="!show">显示/隐藏</button>
    <Child v-model:show="show"/>
</template>
