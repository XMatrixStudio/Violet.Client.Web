import { message } from 'antd'

export default {
  errorHandler: (error: any, handler: (msg: string) => void) => {
    if (error && error.response && error.response.data) {
      switch (error.response.data.error) {
        case 'invalid_token':
          message.error('请先登陆')
          // TODO 跳转到登陆界面
          break
        case 'timeout_token':
          message.error('登陆已过期')
          // TODO 跳转到登陆界面
          break
        case 'permission_deny':
          message.error('权限不足')
          break
        case 'ban_user':
          message.error('当前账号异常，无法进行操作')
          break
        default:
          handler(error.response.data.error)
      }
    } else {
      handler('未知错误')
    }
  }
}
