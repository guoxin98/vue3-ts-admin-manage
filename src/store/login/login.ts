import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
const LOGIN_TOKEN = 'token'
const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localCache.getCache(LOGIN_TOKEN) || '',
    name: ''
  }),
  actions: {
    async loginAccountAction(account: any) {
      // 账号登录，获取token信息
      const res = await accountLoginRequest(account)
      this.id = res.data.id
      this.token = res.data.token
      this.name = res.data.name
      // 本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)
      // 页面跳转
      router.push('/main')
    }
  }
})
export default useLoginStore
