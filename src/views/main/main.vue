<!--
 * @Author: guoxin
 * @Date: 2023-03-14 16:23:42
 * @LastEditors: guoxin
 * @LastEditTime: 2023-03-20 21:17:51
 * @Description: 首页
-->
<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <main-menu :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header height="auto">
          <main-header @foldChange="handleFoldChange"></main-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'
const isCollapse = ref(false)
const breadCrumbKey = ref(0)
function handleFoldChange(isFold: boolean) {
  isCollapse.value = isFold
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  .main-container {
    width: 100%;
    height: 100%;
    // :deep(.el-aside) {
    //   // width: 200px;
    // }
  }
  :deep(.el-aside) {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    transition: width 0.3s linear;
    background: #001529;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  :deep(.el-main) {
    background-color: #f0f2f6;
  }
}
</style>
