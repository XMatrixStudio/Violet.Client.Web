import axios from 'axios'
import { createHash } from 'crypto'

export default {
  // 更改用户等级
  UpdateLevel: async (req: PostUsersLevels.ReqBody) => {
    const res = await axios.post('/api/i/users/levels', req)
    return res
  },
  // 获取信息
  GetInfo: async (
    success: (info: GetUsersByName.ResBody) => void,
    failed?: () => void
  ) => {
    try {
      const res = await axios.get<GetUsersByName.ResBody>('/api/i/users/me')
      if (res && res.data) {
        success(res.data)
      } else {
        failed!()
      }
    } catch (_) {
      failed!()
    }
  },
  // 修改信息
  UpdateInfo: async (req: PatchUsers.ReqBody) => {
    // 处理密码加密
    if (req.secure) {
      req.secure.oldPassword = createHash('sha512')
        .update(req.secure.oldPassword)
        .digest('hex')
      req.secure.newPassword = createHash('sha512')
        .update(req.secure.newPassword)
        .digest('hex')
    }
    const res = await axios.patch('/api/i/users', req)
    return res
  },
  // 登陆
  Login: async (account: string, password: string, remember: boolean) => {
    const req: PostUsersSession.ReqBody = {
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
    const req: PostUsers.ReqBody = {
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
    const req: PutUsersEmail.ReqBody | PutUsersPhone.ReqBody = {
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
    const req: PutUsersEmail.ReqBody | PutUsersPhone.ReqBody = {
      operator: 'reset',
      code: captcha,
      password: createHash('sha512')
        .update(password)
        .digest('hex')
    }
    const res = await axios.put(url, req)
    return res
  },
  // 验证手机/邮箱 - 更改绑定
  UpdateAccount: async (account: string, captcha: string, password: string) => {
    const url = account.includes('@')
      ? '/api/i/users/email'
      : '/api/i/users/phone'
    const req: PutUsersEmail.ReqBody | PutUsersPhone.ReqBody = {
      operator: 'update',
      code: captcha,
      password: createHash('sha512')
        .update(password)
        .digest('hex')
    }
    const res = await axios.put(url, req)
    return res
  },
  // 获取验证码
  GetValid: async (
    account: string,
    captcha: string,
    type: 'register' | 'reset' | 'update'
  ) => {
    const isEmail = account.includes('@')
    const url = isEmail ? '/api/i/users/email' : '/api/i/users/phone'
    const req: PostUsersEmail.ReqBody | PostUsersPhone.ReqBody = isEmail
      ? {
          operator: type,
          email: account,
          captcha: captcha
        }
      : {
          operator: type,
          phone: account,
          captcha: captcha
        }
    const res = await axios.post(url, req)
    return res
  },
  // 退出登陆
  Logout: async () => {
    await axios.delete('/api/i/users/session')
  }
}
