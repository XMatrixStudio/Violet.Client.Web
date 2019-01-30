import { message } from 'antd'

export default {
  errorHandler: (error: any, handler: (msg: string) => void) => {
    if (error && error.response && error.response.data) {
      handler(error.response.data.error)
    } else {
      message.error('发生错误')
      console.log(error)
      console.log(error.response)
    }
  }
}
