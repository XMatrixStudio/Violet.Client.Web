import { observable, action } from 'mobx'
import UserService from 'src/Services/UserService'
import UtilService from 'src/Services/UtilService'

export interface IUser {
  init: boolean
  info: GetUsersByName.ResBody
  loginLog: Array<{
    time: Date
    ip: string
    location?: string
  }>
}

class UserStore {
  @observable state: IUser
  @observable orgs: GetUsersByNameOrgs.IOrg[]
  constructor() {
    this.state = {
      init: false,
      info: {
        name: '',
        level: 0,
        createTime: new Date(0),
        info: {
          avatar: '',
          nickname: ''
        }
      },
      loginLog: []
    }
    this.orgs = []
  }

  updateInfo(failed?: () => void, newAvatar?: boolean) {
    UserService.GetInfo(data => {
      if (newAvatar === true) {
        data.info.avatar = data.info.avatar + '?t=' + new Date().getTime()
      }
      this.setInfo(data)
    }, failed)
  }

  @action setInfo(info: GetUsersByName.ResBody) {
    this.state.info = info
    this.state.init = true
    const log = info.log
    // 按需解析 IP 地址
    if (log) {
      if (this.state.loginLog.length !== log.login.length) {
        this.state.loginLog = log.login
      }
      log.login.forEach(async (value, index) => {
        if (
          this.state.loginLog[index].location === undefined ||
          this.state.loginLog[index].ip !== value.ip
        ) {
          this.state.loginLog[index].location = await UtilService.getIPAddress(
            value.ip
          )
        }
      })
    }
  }

  @action addOrgs(orgs: GetUsersByNameOrgs.IOrg[], first: boolean) {
    if (first) {
      this.orgs = orgs
    } else {
      this.orgs.concat(orgs)
    }
  }
}

export default UserStore
