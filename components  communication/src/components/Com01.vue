<template>
  子组件：{{ parent }}
  <button @click="$emit('add', 1)">++</button>
</template>
<script>
export default {
  model: {
    prop: 'parent',
    event: 'add'
  },
  props: {
    parent: Boolean
  },
  data () {
    return {
      }
    }
}
</script>

