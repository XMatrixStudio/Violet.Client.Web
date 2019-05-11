import { observable, action, runInAction } from 'mobx'
import UserService from 'src/Services/UserService'
import UtilService from 'src/Services/UtilService'

class UserStore {
  @observable data: Type.UserInfoData
  @observable orgs: Type.UserOrgInfoData[]
  @observable loginLog: Array<{
    time: Date
    ip: string
    location?: string
  }>
  @observable requests: GetUsersRequests.IRequest[]
  @observable init: boolean
  constructor() {
    this.logout()
    this.loginLog = []
    this.orgs = []
    this.requests = []
  }

  @action
  updateRequests() {
    UserService.GetRequests().then(res => {
      runInAction(() => {
        this.requests = res.data
      })
    })
  }

  @action
  updateInfo(failed?: () => void, newAvatar?: boolean) {
    UserService.GetInfo(data => {
      if (newAvatar === true) {
        data.info.avatar = data.info.avatar + '?t=' + new Date().getTime()
      }
      this.setInfo(data)
    }, failed)
  }

  @action
  setInfo(data: Type.UserInfoData) {
    this.data = data
    this.init = true
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

  @action
  logout() {
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
  addOrgs(orgs: Type.UserOrgInfoData[], first: boolean) {
    if (first) {
      this.orgs = orgs
    } else {
      this.orgs.concat(orgs)
    }
  }
}

export default UserStore
