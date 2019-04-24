import { observable, action } from 'mobx'
import UserService from 'src/Services/UserService'
import UtilService from 'src/Services/UtilService'

export interface IUser {
  init: boolean
  info: User.GET.ResponseBody
  loginLog: Array<{
    time: Date
    ip: string
    location?: string
  }>
}

class UserStore {
  @observable state: IUser
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
  }

  updateInfo(failed: () => void) {
    UserService.GetInfo(data => {
      this.setInfo(data)
    }, failed)
  }

  @action setInfo(info: User.GET.ResponseBody) {
    this.state.info = info
    this.state.init = true
    const log = info.log
    if (log) {
      this.state.loginLog = log.login
      this.state.loginLog.forEach(async (value, index) => {
        this.state.loginLog[index].location = await UtilService.getIPAddress(
          value.ip
        )
      })
    }
  }
}

export default UserStore
