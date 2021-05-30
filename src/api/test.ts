import request from '@/utils/request'

export const test = (data: any): any =>
  request({
    url: '/like',
    method: 'post',
    data: data,
  })