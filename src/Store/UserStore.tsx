import { observable, action, runInAction } from 'mobx'
import UserService from 'src/Services/UserService'
import UtilService from 'src/Services/UtilService'

class UserStore {
  /** 是否初始化 */
  @observable init: boolean
  /** 用户信息 */
  @observable data: Type.UserInfoData
  /** 用户组织列表 */
  @observable orgs?: Type.UserOrgInfoData[]
  /** 用户登陆日志信息 */
  @observable loginLog: Array<{
    time: Date
    ip: string
    location?: string
  }>
  /** 用户请求信息 */
  @observable requests: GetUsersRequests.IRequest[]
  constructor() {
    this.ClearUserInfo()
    this.loginLog = []
    this.requests = []
  }

  /**
   * 更新申请信息
   */
  UpdateRequests() {
    UserService.GetRequests().then(res => {
      this.setRequests(res.data)
    })
  }

  /**
   * 更新用户信息
   * @param failed 失败回调
   * @param newAvatar 是否为新头像，新头像强制刷新
   */
  UpdateInfo(failed?: () => void, newAvatar?: boolean) {
    UserService.GetInfo(
      data => {
        if (newAvatar === true) {
          data.info.avatar = data.info.avatar + '?t=' + new Date().getTime()
        }
        this.setInfo(data)
      },
      () => {
        this.ClearUserInfo()
        if (failed) {
          failed()
        }
      }
    )
  }

  @action
  setRequests(data: GetUsersRequests.IRequest[]) {
    this.requests = data
  }

  @action
  setInfo(data: Type.UserInfoData) {
    this.init = true
    this.data = data
    const log = data.log
    // 按需解析 IP 地址
    if (log) {
      if (this.loginLog.length !== log.login.length) {
        this.loginLog = log.login
      }
      log.login.forEach(async (value, index) => {
        if (
          this.loginLog[index].location === undefined ||
          this.loginLog[index].ip !== value.ip
        ) {
          const res = await UtilService.getIPAddress(value.ip)
          runInAction('updateLocation', () => {
            this.loginLog[index].location = res
          })
        }
      })
    }
  }

  /**
   * 清空用户信息
   */
  @action
  ClearUserInfo() {
    this.init = false
    this.data = {
      id: '',
      name: '',
      level: 0,
      createTime: new Date(0),
      info: {
        avatar: '',
        nickname: ''
      }
    }
  }

  @action
  SetOrgs(orgs: Type.UserOrgInfoData[]) {
    this.orgs = orgs
  }
}

export default UserStore
