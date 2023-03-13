<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
interface Me {
  name: string
}
const me: Me = { name: 'gx' }
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
