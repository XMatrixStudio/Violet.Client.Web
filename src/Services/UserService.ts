import axios from 'axios'

export default {
  Login: async (account: string, password: string, remember: boolean) => {
    await axios.get('')
  },
  // 获取验证码
  GetValid: async (account: string, captcha: string, isNew: boolean) => {
    const operator = isNew ? 'register' : 'other'
    const isEmail = account.includes('@')
    const url = isEmail ? '/api/i/user/email' : '/api/i/user/phone'
    const accountType = isEmail ? 'email' : 'phone'
    const res = await axios.post(url, {
      operator: operator,
      [accountType]: account,
      captcha: captcha
    })
    return res
  }
}
