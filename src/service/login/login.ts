import hyRequest from '..'
// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants'
export function accountLoginRequest(account: any) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}
export function getUserInfoById(id: number) {
  // return hyRequest.get({
  //   url: '/user',
  //   params: id
  // })
  return hyRequest.get({
    url: `/users/${id}`
  })
}
export function getUserRoleById(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
