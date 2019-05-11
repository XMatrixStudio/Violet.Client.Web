import { observable, action, runInAction } from 'mobx'
import UserService from 'src/Services/UserService'
import UtilService from 'src/Services/UtilService'

export interface IUser {
  init: boolean
  info: Type.UserInfoData
}

class UserStore {
  @observable state: IUser
  @observable orgs: Type.UserOrgInfoData[]
  @observable loginLog: Array<{
    time: Date
    ip: string
    location?: string
  }>
  @observable requests: GetUsersRequests.IRequest[]
  constructor() {
    this.state = {
      init: false,
      info: {
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

  updateInfo(failed?: () => void, newAvatar?: boolean) {
    UserService.GetInfo(data => {
      if (newAvatar === true) {
        data.info.avatar = data.info.avatar + '?t=' + new Date().getTime()
      }
      this.setInfo(data)
    }, failed)
  }

  @action setInfo(info: Type.UserInfoData) {
    this.state.info = info
    this.state.init = true
    const log = info.log
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

  @action logout() {
    this.state.init = false
  }

  @action addOrgs(orgs: Type.UserOrgInfoData[], first: boolean) {
    if (first) {
      this.orgs = orgs
    } else {
      this.orgs.concat(orgs)
    }
  }
}

export default UserStore
