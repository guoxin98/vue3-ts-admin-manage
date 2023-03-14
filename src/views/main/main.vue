<template>
  <div class="main">
    <el-button @click="logout">退出登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import { localCache } from '@/utils/cache'
import router from '@/router'
// 退出登录需要清除用户数据
function logout() {
  localCache.removeCache('token')
  router.push('/login')
}
</script>

<style lang="less" scoped></style>
