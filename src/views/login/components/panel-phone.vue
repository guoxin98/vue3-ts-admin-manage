<template>
  <div class="panel-phone">
    <el-form label-width="65px">
      <el-form-item label="手机号" required>
        <el-input />
      </el-form-item>
      <el-form-item label="密码" class="MT18" required>
        <el-input type="password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.panel-phone {
  .MT18 {
    margin-top: 18px;
  }
  /deep/ .el-form-item {
    margin-bottom: unset;
  }
}
</style>
