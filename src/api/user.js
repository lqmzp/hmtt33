// api文件根据后端接口文档划分
import request from '@/utils/request'
/**
 *
 * @param {Number} mobile 手机号
 * @param {Number} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

export const sendCodeApi = (a) => {
  return request({
    url: `/v1_0/sms/codes/${a}`,
    data: {
      a
    }
  })
}

export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
  })
}
