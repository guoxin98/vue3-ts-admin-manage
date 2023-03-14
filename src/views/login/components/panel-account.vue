<template>
  <div class="panel-account">
    <el-form label-width="65px" :model="loginForm" :rules="rules" ref="formRef">
      <el-form-item label="账号" prop="account">
        <el-input v-model.trim="loginForm.account" />
      </el-form-item>
      <el-form-item label="密码" class="MT18" prop="password">
        <el-input type="password" v-model.trim="loginForm.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import type { FormRules, FormInstance, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'
const loginForm = reactive({
  account: localCache.getCache('name') || '',
  password: localCache.getCache('password') || ''
})
const rules = reactive<FormRules>({
  account: [
    { required: true, message: '请输入用户账号', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{6,20}$/, message: '必须是6-20个字母或者数字', trigger: 'change' }
  ],
  password: [
    { required: true, message: '必须输入密码信息', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{3,}$/, message: '必须是3位以上的字母或者数字', trigger: 'change' }
  ]
})
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
// 账号登录事件
function loginAction(isRemPwd: boolean) {
  // 表单校验
  formRef.value?.validate((isValid: boolean) => {
    if (isValid) {
      const name = loginForm.account
      const password = loginForm.password
      loginStore.loginAccountAction({ name, password })
      // 登录成功后执行操作
      if (isRemPwd) {
        localCache.setCache('name', name)
        localCache.setCache('password', password)
      } else {
        localCache.removeCache('name')
        localCache.removeCache('password')
      }
    } else {
      ElMessage({
        message: '请输入正确的账号密码后再进行登录！',
        grouping: true,
        type: 'error'
      })
    }
  })
}
// 密码记忆事件
// 暴露登录事件
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.panel-account {
  .MT18 {
    margin-top: 18px;
  }
  :deep(.el-form-item) {
    margin-bottom: unset;
  }
}
</style>
