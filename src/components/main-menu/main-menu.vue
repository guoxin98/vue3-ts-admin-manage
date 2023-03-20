<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title">后台管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        :collapse="props.isCollapse"
        background-color="#0a1f37"
        text-color="#fff"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 动态组件实现icon渲染 -->
              <el-icon>
                <component :is="UpCase(item.icon)" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group v-if="item.children && item.children.length">
              <template v-for="childrenItem in item.children" :key="childrenItem.id">
                <el-menu-item
                  :index="childrenItem.id + ''"
                  @click="handleItemClick(childrenItem)"
                  >{{ childrenItem.name }}</el-menu-item
                >
              </template>
            </el-menu-item-group>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useLoginStore from '@/store/login/login'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { firstMenu, mapPathToMenu } from '@/utils/map-menus'
// 获取菜单
const loginStore = useLoginStore()
const props = defineProps(['isCollapse'])
const userMenus = loginStore.userMenus
// 先获取路径
const route = useRoute()
const pathMenu = mapPathToMenu(route.path, userMenus)
const defaultActive = ref(pathMenu.id + '')
function UpCase(str: string) {
  const UpCaseStr = str.substring(0, 1).toUpperCase() + str.substring(1)
  return UpCaseStr
}
const router = useRouter()
function handleItemClick(item: any) {
  router.push(item.url)
}
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  width: 100%;
  background-color: #001529;
  :deep(.el-menu-item-group__title) {
    display: none;
  }
  :deep(.el-menu) {
    border-right: unset;
    background-color: #00142d;
    .el-sub-menu__title {
      color: #fff;
      :hover {
        background: unset !important;
      }
    }

    .el-sub-menu {
      &.is-opened {
        background-color: #0a1f37;
      }
      :hover {
        color: #fff;
        background: #0a60bd;
      }
    }
    .el-menu-item {
      background-color: #0a1f37;
      color: #fff;
      &.is-active {
        background-color: #0a60bd;
      }
    }
  }
}

.logo {
  display: flex;
  width: 100%;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
    margin-left: 5px;
  }
}
</style>
