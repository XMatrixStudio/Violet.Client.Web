import axios from 'axios'
import { createHash } from 'crypto'

export default {
  // 获取信息
  GetInfo: async (
    success: (info: User.GET.ResponseBody) => void,
    failed?: () => void
  ) => {
    try {
      const res = await axios.get<User.GET.ResponseBody>('/api/i/users/me')
      if (res && res.data) {
        success(res.data)
      } else {
        failed!()
      }
    } catch (_) {
      failed!()
    }
  },
  // 登陆
  Login: async (account: string, password: string, remember: boolean) => {
    const req: User.Session.POST.RequestBody = {
      user: account,
      password: createHash('sha512')
        .update(password)
        .digest('hex'),
      remember: remember
    }
    const res = await axios.post('/api/i/users/session', req)
    return res
  },
  // 注册
  Register: async (userName: string, nickname: string, password: string) => {
    const req: User.POST.RequestBody = {
      name: userName,
      nickname: nickname,
      password: createHash('sha512')
        .update(password)
        .digest('hex')
    }
    const res = await axios.post('/api/i/users', req)
    return res
  },
  // 验证邮箱/手机 - 注册
  Valid: async (account: string, captcha: string) => {
    const url = account.includes('@')
      ? '/api/i/users/email'
      : '/api/i/users/phone'
    const req: User.Email.PUT.RequestBody | User.Phone.PUT.RequestBody = {
      operator: 'register',
      code: captcha
    }
    const res = await axios.put(url, req)
    return res
  },
  // 验证手机/邮箱 - 重置密码
  ResetPassword: async (account: string, captcha: string, password: string) => {
    const url = account.includes('@')
      ? '/api/i/users/email'
      : '/api/i/users/phone'
    const req: User.Email.PUT.RequestBody | User.Phone.PUT.RequestBody = {
      operator: 'reset',
      code: captcha,
      password: createHash('sha512')
        .update(password)
        .digest('hex')
    }
    const res = await axios.put(url, req)
    return res
  },
  // 获取验证码
  GetValid: async (account: string, captcha: string, isNew: boolean) => {
    const isEmail = account.includes('@')
    const url = isEmail ? '/api/i/user/email' : '/api/i/user/phone'
    const req:
      | User.Email.POST.RequestBody
      | User.Phone.POST.RequestBody = isEmail
      ? {
          operator: isNew ? 'register' : 'reset',
          email: account,
          captcha: captcha
        }
      : {
          operator: isNew ? 'register' : 'reset',
          phone: account,
          captcha: captcha
        }
    const res = await axios.post(url, req)
    return res
  },
  // 退出登陆
  Logout: async () => {
    await axios.delete('/api/i/user/session')
  }
}
