declare namespace Type {
  interface UserInfoData extends GetUsersByExtUid.ResBody {}

  interface OrgInfoData extends GetUsersByUidOrgs.IOrg {}

  interface OrgAppInfoData extends GetOrgsByIdApps.IApp {}

  interface UserAppInfoData extends GetUsersByUidApps.IApp {}

  interface AppInfoData extends GetAppsByExtId.ResBody {}
}
