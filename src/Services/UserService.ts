import axios from 'axios'
import { createHash } from 'crypto'

export interface IUserInfo {
  class: string
  name: string
  nickname: string
  email: string
  phone: string
  avatar: string
}

export default {
  // 获取信息
  GetInfo: async (success: (info: IUserInfo) => void, failed?: () => void) => {
    try {
      const res = await axios.get('/api/i/users/me')
      if (res && res.data) {
        success({
          class: res.data.class,
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          nickname: res.data.info.nickname,
          avatar: res.data.info.avatar
        })
      } else {
        failed!()
      }
    } catch (_) {
      failed!()
    }
  },
  // 登陆
  Login: async (account: string, password: string, remember: boolean) => {
    const res = await axios.post('/api/i/users/session', {
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
    const res = await axios.post('/api/i/users', {
      name: userName,
      nickname: nickname,
      password: createHash('sha512')
        .update(password)
        .digest('hex')
    })
    return res
  },
  // 验证邮箱/手机
  Valid: async (account: string, captcha: string) => {
    const isEmail = account.includes('@')
    const res = await axios.put(
      isEmail ? '/api/i/users/email' : '/api/i/users/phone',
      {
        operator: 'register',
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
  },
  // 重置密码
  ResetPassword: async (account: string, captcha: string, password: string) => {
    const isEmail = account.includes('@')
    const res = await axios.put(
      isEmail ? '/api/i/user/email' : '/api/i/user/phone',
      {
        operator: 'reset',
        code: captcha,
        password: createHash('sha512')
          .update(password)
          .digest('hex')
      }
    )
    return res
  },
  // 退出登陆
  Logout: async () => {
    await axios.delete('/api/i/user/session')
  }
}
