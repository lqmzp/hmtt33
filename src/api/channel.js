import request from '@/utils/request'

export const getChannerlAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
