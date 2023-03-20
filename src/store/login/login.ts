import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserRoleById } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import router from '@/router'
// 导入路由映射文件
const LOGIN_TOKEN = 'token'
interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? []
  }),
  actions: {
    async loginAccountAction(account: any) {
      // 账号登录，获取token信息
      const res = await accountLoginRequest(account)

      // 本地缓存
      localCache.setCache(LOGIN_TOKEN, res.data.token)
      // 获取用户登录的详细信息
      const userInfo = await getUserInfoById(res.data.id)
      this.userInfo = userInfo.data
      localCache.setCache('userInfo', userInfo.data)
      // 获取菜单权限
      const userRole = await getUserRoleById(res.data.id)
      this.userMenus = userRole.data
      localCache.setCache('userMenus', userRole.data)
      // 动态添加路由
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      // 页面跳转
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 用户刷新页面加载pinia数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 添加路由
        const routes = mapMenusToRoutes(this.userMenus)
        routes.forEach((route) => {
          router.addRoute('main', route)
        })
      }
    }
  }
})

export default useLoginStore
