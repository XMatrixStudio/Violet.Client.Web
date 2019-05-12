import { observable, action, autorun, IReactionDisposer } from 'mobx'

export interface IUser {
  registerValidTime: Date
  resetValidTime: Date
}

class AuthStore {
  @observable state: IUser
  autoSave: IReactionDisposer
  constructor() {
    const state = localStorage.getItem('auth_state')
    if (state && state !== undefined && state !== 'undefined') {
      try {
        this.state = JSON.parse(state)
      } catch (error) {
        console.log('非法本地存储', error)
      }
    } else {
      this.state = {
        registerValidTime: new Date(0),
        resetValidTime: new Date(0)
      }
    }

    this.autoSave = autorun(() => {
      localStorage.setItem('auth_state', JSON.stringify(this.state))
    })
  }

  @action setRegisterValidTime() {
    this.state.registerValidTime = new Date()
  }

  @action resetRegisterValidTime() {
    this.state.registerValidTime = new Date(0)
  }

  @action setResetValidTime() {
    this.state.resetValidTime = new Date()
  }
}

export default AuthStore
