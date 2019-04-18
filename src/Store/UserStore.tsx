import { observable, action } from 'mobx'
import UserService from 'src/Services/UserService'

export interface IUser {
  info: User.GET.ResponseBody
}

class UserStore {
  @observable state: IUser
  constructor() {
    this.state = {
      info: {
        name: '',
        level: 0,
        createTime: new Date(0),
        info: {
          avatar: '',
          nickname: ''
        }
      }
    }
  }

  updateInfo(failed: () => void) {
    UserService.GetInfo(data => {
      this.setInfo(data)
    }, failed)
  }

  @action setInfo(info: User.GET.ResponseBody) {
    this.state.info = info
  }
}

export default UserStore
