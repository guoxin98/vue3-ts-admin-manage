<template>
  <div class="main-header">
    <div class="bread-crumb">
      <el-icon size="24" @click="handleMenuIconClick">
        <component :is="isShowFoldIcon ? 'Expand' : 'Fold'" />
      </el-icon>
      <!-- <el-breadcrumb class="el-bread" separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in breadCrumbMenu" :key="item.url" :path="item.url">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb> -->
      <bread-crumbs></bread-crumbs>
    </div>
    <div class="info">
      <span v-for="(item, index) in infoIcons" :key="index">
        <el-icon size="20" class="info-icons"><component :is="item" /></el-icon>
      </span>
      <el-dropdown :hide-on-click="false">
        <span class="avatar-name">
          <el-avatar
            :size="30"
            src="http://localhost:9000/users/1/avatar/a46eaecc31a843842c2bdf605b42ae8b"
          ></el-avatar>
          <span class="name">coder</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick"
              ><el-icon><CircleClose /></el-icon> <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item
              ><el-icon><Lock /></el-icon> <span>修改密码</span></el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { localCache } from '@/utils/cache'
import { ref, defineProps } from 'vue'
import { LOGIN_TOKEN } from '@/global/constants'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToBreadCrumbs } from '@/utils/map-menus'
import useLoginStore from '@/store/login/login'
import BreadCrumbs from './components/breadCrumbs.vue'
const emit = defineEmits(['foldChange'])
const infoIcons = ['Message', 'ChatDotRound', 'Search']
const isShowFoldIcon = ref(false)
function handleMenuIconClick() {
  isShowFoldIcon.value = !isShowFoldIcon.value
  emit('foldChange', isShowFoldIcon.value)
}
// 退出系统
const router = useRouter()
function handleExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  localCache.removeCache('userInfo')
  localCache.removeCache('userMenus')
  router.push('/login')
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  .bread-crumb {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-bread {
    margin-left: 10px;
  }
  :deep(.el-icon) {
    cursor: pointer;
  }
  .info {
    display: flex;
    align-items: center;
  }
  .info-icons {
    margin-right: 10px;
    :hover {
      background-color: #f2f6fc;
    }
  }
  .avatar-name {
    display: flex;
    align-items: center;
    .name {
      margin-left: 5px;
      font-size: 16px;
    }
  }
}
</style>
