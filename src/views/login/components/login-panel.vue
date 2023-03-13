<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs @tab-click="handleClickTab" v-model="activeName" type="border-card" stretch>
        <!-- 账号登录 -->
        <el-tab-pane name="account">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><User /></el-icon>
              <span class="ML5">账号登录</span>
            </span>
          </template>
          account
        </el-tab-pane>
        <!-- 手机登录 -->
        <el-tab-pane name="phone">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Iphone /></el-icon>
              <span class="ML5">手机登录</span>
            </span>
          </template>
          phone
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRememberPwd" label="记住密码" />
      <el-button v-model="isForgetPwd" type="t">忘记密码</el-button>
    </div>
    <el-button class="login-btn" type="primary">立即登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const isRememberPwd = ref(false)
const isForgetPwd = ref(false)
const activeName = ref<string>('phone')
function handleClickTab() {
  console.log('handleClick:', activeName.value)
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  .title {
    font-size: 24px;
  }
  .tabs {
    width: 100%;
    margin-top: 10px;
  }
  .controls {
    width: 100%;

    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
  }
  .custom-tabs-label {
    display: flex;
    justify-content: center;
    align-items: center;
    .ML5 {
      margin-left: 5px;
    }
  }
}
</style>
