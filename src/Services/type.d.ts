declare namespace Type {
  // 搜索用户列表信息
  interface SearchUserInfoData extends GetUsers.IUser {}
  // 用户信息
  interface UserInfoData extends GetUsersByExtUid.ResBody {}
  // 授权信息
  interface UserAuthData extends GetUsersAuths.IAuth {}
  // 用户组织列表信息
  interface UserOrgInfoData extends GetUsersByUidOrgs.IOrg {}
  // 用户应用列表信息
  interface UserAppInfoData extends GetUsersByUidApps.IApp {}
  // 组织应用列表信息
  interface OrgAppInfoData extends GetOrgsByIdApps.IApp {}
  // 应用信息
  interface AppInfoData extends GetAppsByExtId.ResBody {}
  // 组织信息
  interface OrgInfoData extends GetOrgsByExtId.ResBody {}
  // 组织成员列表信息
  interface OrgMemberInfoData extends GetOrgsByIdMembers.IUser {}

  interface IAuthParams {
    response_type: string
    client_id: string
    quick_mode: boolean
    redirect_url: string
    state: string
    scope: string[]
    valid: boolean
  }
}
