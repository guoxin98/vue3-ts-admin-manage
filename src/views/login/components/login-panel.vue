<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs v-model="activeName" type="border-card" stretch>
        <!-- 账号登录 -->
        <el-tab-pane name="account">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><User /></el-icon>
              <span class="ML5">账号登录</span>
            </span>
          </template>
          <panel-account ref="accountRef" :isRemPwd="isRemPwd" />
        </el-tab-pane>
        <!-- 手机登录 -->
        <el-tab-pane name="phone">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Iphone /></el-icon>
              <span class="ML5">手机登录</span>
            </span>
          </template>
          <panel-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" />
      <el-button v-model="isForgetPwd" type="text">忘记密码</el-button>
    </div>
    <el-button class="login-btn" type="primary" @click="handleClickLogin">立即登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import PanelAccount from './panel-account.vue'
import PanelPhone from './panel-phone.vue'

import { ref, watch } from 'vue'
import { localCache } from '@/utils/cache'
const isRemPwd = ref(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (nv) => {
  localCache.setCache('isRemPwd', nv)
})
const isForgetPwd = ref(false)
const activeName = ref<string>('account')
const accountRef = ref<InstanceType<typeof PanelAccount>>()
function handleClickLogin() {
  if (activeName.value === 'account') {
    accountRef.value!.loginAction(isRemPwd.value)
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
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
    :deep(.el-tabs__content) {
      padding: 25px;
    }
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
