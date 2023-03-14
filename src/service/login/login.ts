import hyRequest from '..'
// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants'
export function accountLoginRequest(account: any) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}
