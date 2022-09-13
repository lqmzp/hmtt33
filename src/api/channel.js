import request from '@/utils/request'

export const getChannerlAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

export const getAllChannerlAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
