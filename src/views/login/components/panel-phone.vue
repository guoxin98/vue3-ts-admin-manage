<template>
  <div class="panel-phone">
    <el-form label-width="65px" :model="loginForm" :rules="rules" ref="formRef">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.trim="loginForm.phone" />
      </el-form-item>
      <el-form-item label="验证码" class="MT18 flex" prop="VerifiyCode">
        <el-input type="VerifiyCode" v-model.trim="loginForm.VerifiyCode" />
        <el-button type="primary" class="ML5" @click="getVerifiyCode">获取验证码</el-button>
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
  phone: '',
  VerifiyCode: ''
})
// 创建属性判断是否已点击过验证码
const isClickVerifiyCode = ref<boolean>(false)
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: '请输入正确的手机号码',
      trigger: 'change'
    }
  ],
  VerifiyCode: [
    { required: true, message: '必须输入验证码', trigger: 'blur' },
    { pattern: /^[0-9]{4}$/, message: '请输入验证码', trigger: 'change' }
  ]
})
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
// 手机号登录事件
function loginAction(isRemPwd: boolean) {
  // 表单校验
  formRef.value?.validate((isValid: boolean) => {
    if (isValid) {
      const name = loginForm.phone
      const VerifiyCode = loginForm.VerifiyCode
      // 登录成功后执行操作
    } else {
      ElMessage({
        message: '请输入正确的账号密码后再进行登录！',
        grouping: true,
        type: 'error'
      })
    }
  })
}
function getVerifiyCode() {
  formRef.value
    ?.validateField('phone')
    .then(() => {
      if (!isClickVerifiyCode.value) {
      }
    })
    .catch((rej) => {
      ElMessage({
        message: '请输入正确的手机号码后再获取验证码！',
        grouping: true,
        type: 'error'
      })
    })
}
// 密码记忆事件
// 暴露登录事件
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.panel-phone {
  .MT18 {
    margin-top: 18px;
    :deep(.el-form-item__content) {
      display: flex;
      flex-wrap: nowrap;
    }
  }
  .ML5 {
    margin-left: 5px;
  }
  :deep(.el-form-item) {
    margin-bottom: unset;
  }
}
</style>
