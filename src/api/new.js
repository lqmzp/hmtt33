import request from '@/utils/request'
/**
 *
 * @param {string|Number} id 频道id
 * @param {Number} timestamp 请求新的时间戳
 * @returns
 */
export const getArticles = (id, timestamp) => {
  return request({
    url: 'v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
