<!-- <template>
<div>
  <div>
    父组件：{{ parent }}
  </div>
  <Com01 :parent="parent" @add="addFn($event)"/>
</div>

</template>

<script>
import Com01 from './components/Com01.vue'
export default {
  components: {
    Com01
  },
  data () {
    return {
        parent: 1
      }
    },
  methods: {
    addFn(e){
      // e === 1
      this.parent += e
    }
  }
};
</script> -->

      
<script setup lang="ts">
import Com02 from './components/parent.vue'
</script>

<template>
  <Com02></Com02>
</template>