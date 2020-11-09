import service from './Service'

const BASE_ORG = '/api/i/orgs'
const BASE_USER = '/api/i/users'
const BASE_APP = '/api/i/apps'

const DevService = {
  // 组织相关
  // 新建组织
  newOrg: async (data: PostOrgs.ReqBody) => {
    const res = await service.post(BASE_ORG, data)
    return res
  },
  // 通过ID获取组织信息
  getOrgInfoByID: async (id: string, all = false) => {
    const res = await service.get<GetOrgsByExtId.ResBody>(BASE_ORG + '/+' + id, {
      params: { all: all }
    })
    return res
  },
  // 通过名字获取组织信息
  getOrgInfoByName: async (name: string, all = false) => {
    const res = await service.get<GetOrgsByExtId.ResBody>(BASE_ORG + '/' + name, {
      params: { all: all }
    })
    return res
  },
  // 获取组织应用
  getOrgApps: async (page: number, limit: number, id: string) => {
    const params: GetOrgsByIdApps.Query = {
      limit: limit,
      page: page
    }
    const res = await service.get<GetOrgsByIdApps.ResBody>(
      BASE_ORG + '/' + id + '/apps',
      {
        params: params
      }
    )
    return res
  },
  // 获取组织成员信息
  getOrgMembers: async (id: string, page = 1, limit = 10) => {
    const params: GetOrgsByIdMembers.Query = {
      limit: limit,
      page: page
    }
    const res = await service.get<GetOrgsByIdMembers.ResBody>(
      BASE_ORG + '/' + id + '/members',
      {
        params: params
      }
    )
    return res
  },
  // 增加组织成员
  addOrgMember: async (orgID: string, userID: string) => {
    const req: PostOrgsByIdMembers.ReqBody = {
      userId: userID
    }
    const res = await service.post(BASE_ORG + '/' + orgID + '/members', req)
    return res
  },
  // 删除组织成员
  removeOrgMember: async (orgID: string, userID: string) => {
    const res = await service.delete(
      BASE_ORG + '/' + orgID + '/members/' + userID
    )
    return res
  },
  // 修改组织成员等级
  editOrgMember: async (orgID: string, userID: string, role: 0 | 1) => {
    const req: PutOrgsByIdMembers.ReqBody = {
      userId: userID,
      role: role
    }
    const res = await service.put(BASE_ORG + '/' + orgID + '/members', req)
    return res
  },

  // 开发者相关
  // 提高开发者应用上限
  // repeat_request - 重复申请
  improveAppCount: async (data: PostUsersRequestsApps.ReqBody) => {
    const res = await service.post(BASE_USER + '/requests/apps', data)
    return res
  },
  // 提高开发者组织上限
  // repeat_request - 重复申请
  improveOrgCount: async (data: PostUsersRequestsOrgs.ReqBody) => {
    const res = await service.post(BASE_USER + '/requests/orgs', data)
    return res
  },
  // 获取开发者个人应用信息
  getDevApps: async (page: number, limit: number, user = 'me') => {
    const params: GetUsersByUidApps.Query = {
      limit: limit,
      page: page
    }
    const res = await service.get<GetUsersByUidApps.ResBody>(
      BASE_USER + '/' + user + '/apps',
      { params: params }
    )
    return res
  },
  // 获取开发者组织
  getDevOrgs: async (page: number, limit: number, user = 'me') => {
    const params: GetUsersByUidOrgs.Query = {
      limit: limit,
      page: page
    }
    const res = await service.get<GetUsersByUidOrgs.ResBody>(
      BASE_USER + '/' + user + '/orgs',
      {
        params: params
      }
    )
    return res
  },

  // 应用相关
  // 新建应用
  // res.data.msg:
  // exist_name - 应用已存在
  // limit_apps - 应用数量达到上限
  // not_exist_owner - 用户 / 组织不存在
  // reserved_name - 应用保留
  newApp: async (req: PostApps.ReqBody) => {
    const res = await service.post(BASE_APP, req)
    return res
  },
  // 更新应用信息
  updateApp: async (req: PatchAppsById.ReqBody, id: string) => {
    const res = await service.patch(BASE_APP + '/' + id, req)
    return res
  },
  // 通过 ID 获取应用信息
  getAppInfoById: async (id: string, all?: boolean) => {
    const res = await service.get<GetAppsByExtId.ResBody>(BASE_APP + '/+' + id, {
      params: {
        all: all
      }
    })
    return res
  },
  // 通过名称获取应用信息
  getAppInfoByName: async (name: string, all?: boolean) => {
    const res = await service.get<GetAppsByExtId.ResBody>(BASE_APP + '/' + name, {
      params: {
        all: all
      }
    })
    return res
  }
}

export default DevService
