import request from '@/utils/request'
export const getDetailAPI = (ID) => {
  return request({
    url: `/v1_0/articles/${ID}`
  })
}
export const getCommentAPI = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}

export const postCommentAPI = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
