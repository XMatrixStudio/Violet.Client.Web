import Request from '../lib/Request'
import { createHash } from 'crypto'
import { UserStore } from '@/store/UserStore'


const UserService = {
  /***
   * 获取当前用户信息
   */
  fetchUserInfo: async (store: UserStore) => {
    try {
      const res = await Request.get<GetUsersByExtUid.ResBody>('/api/i/users/me')
      store.setCurrentUser(res.data)
    } catch (_) {
      store.setCurrentUser(null)
    }
    return store.userInfo
  },

  /**
   * 修改开发者个人信息
   */
  UpdateDevInfo: async (req: PutUsersDev.ReqBody) => {
    const res = await Request.put('/api/i/users/dev', req)
    return res
  },
  // 授权
  Auth: async (req: PostUsersAuths.ReqBody) => {
    const res = await Request.post('/api/i/users/auths', req)
    return res
  },
  // 获取授权信息
  GetAuthByID: async (id: string, url: string) => {
    const req: GetUsersAuthsByAppId.Query = {
      redirectUrl: url
    }
    const res = await Request.get<GetUsersAuthsByAppId.ResBody>(
      '/api/i/users/auths/' + id,
      { params: req }
    )
    return res
  },
  // 获取授权列表
  GetAuths: async (page = 1, limit = 10) => {
    const req: GetUsersAuths.Query = {
      page: page,
      limit: limit
    }
    const res = await Request.get<GetUsersAuths.ResBody>('/api/i/users/auths', {
      params: req
    })
    return res
  },
  // 删除授权
  RemoveAuth: async (id: string) => {
    const res = await Request.delete('/api/i/users/auths/' + id)
    return res
  },
  // 搜索用户
  SearchUser: async (key: string, page = 1, limit = 10) => {
    const req: GetUsers.Query = {
      page: page,
      limit: limit,
      name: key
    }
    const res = await Request.get<GetUsers.ResBody>('/api/i/users', {
      params: req
    })
    return res
  },
  // 获取用户待申请列表
  GetRequests: async () => {
    const res = await Request.get<GetUsersRequests.ResBody>(
      '/api/i/users/requests'
    )
    return res
  },
  /* 更改用户等级 */
  UpdateLevel: async (req: PostUsersRequestsLevels.ReqBody) => {
    const res = await Request.post('/api/i/users/requests/levels', req)
    return res
  },
  // 获取指定用户信息
  GetUserInfo: async (name: string) => {
    const res = await Request.get<GetUsersByExtUid.ResBody>(
      '/api/i/users/' + name
    )
    return res
  },
  // 获取指定 ID 用户信息
  GetUserInfoByID: async (id: string) => {
    const res = await Request.get<GetUsersByExtUid.ResBody>('/api/i/users/+' + id)
    return res
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
    const res = await Request.patch('/api/i/users', req)
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
    const res = await Request.post('/api/i/users/session', req)
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
    const res = await Request.post('/api/i/users', req)
    return res
  },
  // 验证邮箱/手机 - 注册
  Valid: async (
    account: string,
    captcha: string,
    type: 'register' | 'reset'
  ) => {
    const url = account.includes('@')
      ? '/api/i/users/email'
      : '/api/i/users/phone'
    const req: PutUsersEmail.ReqBody | PutUsersPhone.ReqBody = {
      operator: type,
      code: captcha
    }
    const res = await Request.put(url, req)
    return res
  },
  // 验证手机/邮箱 - 重置密码
  ResetPassword: async (password: string) => {
    const res = await Request.post('/api/i/users/reset', {
      password: createHash('sha512')
        .update(password)
        .digest('hex')
    })
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
    const res = await Request.put(url, req)
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
    const res = await Request.post(url, req)
    return res
  },
  // 退出登陆
  Logout: async () => {
    await Request.delete('/api/i/users/session')
  }
}

export default UserService