<template>
  <div class="panel-account">
    <el-form label-width="65px" :model="loginForm" :rules="rules">
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
import type { FormRules } from 'element-plus'
import { reactive } from 'vue'

const loginForm = reactive({
  account: '',
  password: ''
})
const rules = reactive<FormRules>({
  account: [
    { required: true, message: '请输入用户账号', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{6,20}$/, message: '必须是6-20个字母或者数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '必须输入密码信息', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{3,}$/, message: '必须是3位以上的字母或者数字', trigger: 'blur' }
  ]
})
</script>

<style lang="less" scoped>
.panel-account {
  .MT18 {
    margin-top: 18px;
  }
  /deep/ .el-form-item {
    margin-bottom: unset;
  }
}
</style>
