<script setup lang="ts">
const props = defineProps({
    show: {
        type: Boolean,
        default : false
    }
})
const emit = defineEmits(['update:show'])
</script>

<template>
    <div class="box" v-if="props.show">
        <div class="child">子组件：
            <button @click="emit('update:show', false)">显示/隐藏</button>
        </div>
    </div>
</template>

<style>
.box{
    width: 100%;
    height: 10000px;
    background-color: aqua;
}
.child{
    width: 400px;
    height: 400px;
    background-color : red
}
*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}
</style>