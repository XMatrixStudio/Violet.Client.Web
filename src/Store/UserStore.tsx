import { observable, action } from 'mobx'

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
        createTime: new Date(),
        info: {
          avatar: '',
          nickname: ''
        }
      }
    }
  }

  @action setInfo(info: User.GET.ResponseBody) {
    this.state.info = info
  }
}

export default UserStore
