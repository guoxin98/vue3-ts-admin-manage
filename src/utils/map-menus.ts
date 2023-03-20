/*
 * @Author: guoxin
 * @Date: 2023-03-15 17:07:41
 * @LastEditors: guoxin
 * @LastEditTime: 2023-03-20 21:24:44
 * @Description: 路由映射文件
 */
import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'
function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  // 匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk。使用eager:true直接引入所有的模块
  const files: Record<string, any> = import.meta.glob('../router/main/**/*ts', {
    eager: true
  })
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}
export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes()
  // 遍历添加
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        routes.push(route)
      }
      if (!firstMenu && route) {
        firstMenu = submenu
      }
    }
  }
  return routes
}
/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}
/**
 * @description: 面包屑
 * @param {string} path
 * @param {any} userMenus
 * @return {Array}
 */
export function mapPathToBreadCrumbs(path: string, userMenus: any) {
  let breadCrumbs: any[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadCrumbs.push(menu)
        breadCrumbs.push(submenu)
        return breadCrumbs
      }
    }
  }
}
