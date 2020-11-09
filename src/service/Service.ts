import axios from 'axios'

const instance = axios.create({
  timeout: 3000,
  headers: {
    'X-Client': 'Web',
    'X-Client-Version': '4.0.0'
  }
})

instance.interceptors.response.use(res => {
  // 统一处理请求
  return res
}, err => {
  // 统一处理错误
  return Promise.reject(err)
})

export default instance