import Axios from 'axios'

export default {
  // 新建组织
  newOrg: async (data: PostOrgs.ReqBody) => {
    const res = await Axios.post('/api/i/orgs', data)
    return res
  },
  // 获取组织应用
  getOrgApps: async (page: number, limit: number, id: string) => {
    const params: GetOrgsByIdApps.Query = {
      limit: limit,
      page: page
    }
    const res = await Axios.get<GetOrgsByIdApps.ResBody>(
      '/api/i/orgs/' + id + '/apps',
      {
        params: params
      }
    )
    return res
  },
  // 提高开发者应用上限
  // repeat_request - 重复申请
  improveAppCount: async (data: PostUsersRequestsApps.ReqBody) => {
    const res = await Axios.post('/api/i/users/requests/apps', data)
    return res
  },
  // 提高开发者组织上限
  // repeat_request - 重复申请
  improveOrgCount: async (data: PostUsersRequestsOrgs.ReqBody) => {
    const res = await Axios.post('/api/i/users/requests/orgs', data)
    return res
  },
  // 新建应用
  // res.data.msg:
  // exist_name - 应用已存在
  // limit_apps - 应用数量达到上限
  // not_exist_owner - 用户 / 组织不存在
  // reserved_name - 应用保留
  newApp: async (req: PostApps.ReqBody) => {
    const res = await Axios.post('/api/i/apps', req)
    return res
  },
  // 通过 ID 获取应用信息
  getAppInfoById: async (id: string, all?: boolean) => {
    const res = await Axios.get<GetAppsByExtId.ResBody>('/api/i/apps/+' + id, {
      params: {
        all: all
      }
    })
    return res
  },
  // 通过名称获取应用信息
  getAppInfoByName: async (name: string, all?: boolean) => {
    const res = await Axios.get<GetAppsByExtId.ResBody>('/api/i/apps/' + name, {
      params: {
        all: all
      }
    })
    return res
  },
  // 获取开发者个人应用信息
  getDevApps: async (page: number, limit: number, user?: string) => {
    if (user === undefined) {
      user = 'me'
    }
    const params: GetUsersByUidApps.Query = {
      limit: limit,
      page: page
    }
    const res = await Axios.get<GetUsersByUidApps.ResBody>(
      '/api/i/users/' + user + '/apps',
      { params: params }
    )
    return res
  },
  // 获取开发者组织
  getDevOrgs: async (page: number, limit: number, user?: string) => {
    if (user === undefined) {
      user = 'me'
    }
    const params: GetUsersByUidOrgs.Query = {
      limit: limit,
      page: page
    }
    const res = await Axios.get<GetUsersByUidOrgs.ResBody>(
      '/api/i/users/' + user + '/orgs',
      {
        params: params
      }
    )
    return res
  }
}
