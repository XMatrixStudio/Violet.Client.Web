import axios from 'axios'
import { createHash } from 'crypto'

export interface IUserInfo {
  id: string
  name: string
  nickname: string
  email: string
  phone: string
  avatar: string
}

export default {
  // 获取信息
  GetInfo: (success: (info: IUserInfo) => void, failed?: () => void) => {
    axios
      .get('/api/i/user')
      .then(res => {
        if (res && res.data) {
          success({
            id: res.data.id,
            name: res.data.name,
            nickname: res.data.nickname,
            email: res.data.email,
            phone: res.data.phone,
            avatar: res.data.avatar
          })
        } else {
          failed!()
        }
      })
      .catch(_ => {
        failed!()
      })
  },
  // 登陆
  Login: async (account: string, password: string, remember: boolean) => {
    const res = await axios.post('/api/i/user/session', {
      user: account,
      password: createHash('sha512')
        .update(password)
        .digest('hex'),
      remember: remember
    })
    return res
  },
  // 注册
  Register: async (userName: string, nickname: string, password: string) => {
    const res = await axios.post('/api/i/user', {
      name: userName,
      nickname: nickname,
      password: createHash('sha512')
        .update(password)
        .digest('hex')
    })
    return res
  },
  // 验证邮箱/手机
  Valid: async (account: string, captcha: string, isNew: boolean) => {
    const isEmail = account.includes('@')
    const res = await axios.put(
      isEmail ? '/api/i/user/email' : '/api/i/user/phone',
      {
        operator: isNew ? 'register' : 'reset',
        code: captcha
      }
    )
    return res
  },
  // 获取验证码
  GetValid: async (account: string, captcha: string, isNew: boolean) => {
    const isEmail = account.includes('@')
    const res = await axios.post(
      isEmail ? '/api/i/user/email' : '/api/i/user/phone',
      {
        operator: isNew ? 'register' : 'reset',
        [isEmail ? 'email' : 'phone']: account,
        captcha: captcha
      }
    )
    return res
  }
}
