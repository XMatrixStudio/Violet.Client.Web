declare namespace Type {
  /** 用户 - 基本信息 */
  interface UserBaseData extends GetUsers.IUser {}
  /** 用户 - 信息 */
  interface UserInfoData extends GetUsersByExtUid.ResBody {}
  /** 用户 - 授权信息 */
  interface UserAuthData extends GetUsersAuths.IAuth {}
  /** 用户 - 组织列表信息 */
  interface UserOrgInfoData extends GetUsersByUidOrgs.IOrg {}
  /** 用户 - 应用列表信息 */
  interface UserAppInfoData extends GetUsersByUidApps.IApp {}
  /** 组织 - 应用列表信息 */
  interface OrgAppInfoData extends GetOrgsByIdApps.IApp {}
  /** 应用 - 信息 */
  interface AppInfoData extends GetAppsByExtId.ResBody {}
  /** 组织 - 信息 */
  interface OrgInfoData extends GetOrgsByExtId.ResBody {}
  /** 组织 - 成员列表信息 */
  interface OrgMemberInfoData extends GetOrgsByIdMembers.IUser {}

  /** 授权参数 */
  interface AuthParams {
    responseType: string
    appId: string
    quickMode: boolean
    redirectUrl: string
    state: string
    scope: string[]
    valid: boolean
  }
}
