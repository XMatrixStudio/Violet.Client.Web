export declare namespace Type {
  /** 用户 - 基本信息 */
  export interface UserBaseData extends GetUsers.IUser {}
  /** 用户 - 信息 */
  export interface UserInfoData extends GetUsersByExtUid.ResBody {}
  /** 用户 - 授权信息 */
  export interface UserAuthData extends GetUsersAuths.IAuth {}
  /** 用户 - 组织列表信息 */
  export interface UserOrgInfoData extends GetUsersByUidOrgs.IOrg {}
  /** 用户 - 应用列表信息 */
  export interface UserAppInfoData extends GetUsersByUidApps.IApp {}
  /** 组织 - 应用列表信息 */
  export interface OrgAppInfoData extends GetOrgsByIdApps.IApp {}
  /** 应用 - 信息 */
  export interface AppInfoData extends GetAppsByExtId.ResBody {}
  /** 组织 - 信息 */
  export interface OrgInfoData extends GetOrgsByExtId.ResBody {}
  /** 组织 - 成员列表信息 */
  export interface OrgMemberInfoData extends GetOrgsByIdMembers.IUser {}

  /** 授权参数 */
  export interface AuthParams {
    responseType: string
    appId: string
    quickMode: boolean
    redirectUrl: string
    state: string
    scope: string[]
    valid: boolean
  }
}
