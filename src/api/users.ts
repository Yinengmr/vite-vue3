import request from '@/utils/request'

export const login = (data: any): any => {
  return request({
    url: '/login',
    method: 'post',
    data: data,
  })
}