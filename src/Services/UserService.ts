import axios from 'axios'
import { createHash } from 'crypto'

export default {
  // 注册
  Register: async (userName: string, nickName: string, password: string) => {
    const res = await axios.post('/api/i/user', {
      name: userName,
      nickName: nickName,
      password: createHash('sha512')
        .update(password)
        .digest('hex')
    })
    return res
  },
  // 验证邮箱/手机
  Valid: async (captcha: string, isNew: boolean) => {
    const res = await axios.put('/api/i/user/email', {
      operator: isNew ? 'register' : 'other',
      code: captcha
    })
    return res
  },
  // 获取验证码
  GetValid: async (account: string, captcha: string, isNew: boolean) => {
    const isEmail = account.includes('@')
    const res = await axios.post(
      isEmail ? '/api/i/user/email' : '/api/i/user/phone',
      {
        operator: isNew ? 'register' : 'other',
        [isEmail ? 'email' : 'phone']: account,
        captcha: captcha
      }
    )
    return res
  }
}
