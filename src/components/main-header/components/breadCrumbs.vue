<!--
 * @Author: guoxin
 * @Date: 2023-03-20 20:47:33
 * @LastEditors: guoxin
 * @LastEditTime: 2023-03-20 21:08:20
 * @Description: 面包屑组件
-->
<template>
  <el-breadcrumb class="el-bread" separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item in breadCrumbMenu" :key="item.url" :path="item.url">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { mapPathToBreadCrumbs } from '@/utils/map-menus'
import useLoginStore from '@/store/login/login'
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
const route = useRoute()
const breadCrumbs = mapPathToBreadCrumbs(route.path, userMenus)
const breadCrumbMenu = ref(breadCrumbs)
</script>

<style lang="less" scoped>
.bread-crumb {
}
</style>
