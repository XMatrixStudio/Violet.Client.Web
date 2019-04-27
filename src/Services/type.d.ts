declare namespace Type {
  interface UserInfoData extends GetUsersByName.ResBody {}

  interface OrgInfoData extends GetUsersByNameOrgs.IOrg {}

  interface OrgAppInfoData extends GetOrgsByNameApps.IApp {}

  interface UserAppInfoData extends GetUsersByNameApps.IApp {}
}
