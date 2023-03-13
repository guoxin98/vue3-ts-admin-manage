<template>
  <div class="main">
    counter: {{ counterStore.counter }}
    <el-button @click="changeCounter">change counter</el-button>
  </div>
</template>

<script lang="ts" setup>
import useCounterStore from '@/store/counter'
const counterStore = useCounterStore()
function changeCounter(): void {
  counterStore.changeCounterAction(10)
}
</script>

<style lang="less" scoped></style>
