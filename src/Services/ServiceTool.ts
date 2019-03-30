import { message } from 'antd'

export default {
  errorHandler: (error: any, handler: (msg: string) => void) => {
    if (error && error.response && error.response.data) {
      switch (error.response.data.error) {
        case 'invalid_token':
          message.error('请先登陆')
          break
        case 'ban_user':
          message.error('当前账号异常，无法进行操作')
          break
        default:
          handler(error.response.data.error)
      }
    } else {
      message.error('发生错误')
    }
  }
}
