import { observable, action, autorun, IReactionDisposer } from 'mobx'

export interface IUser {
  email: string
  id: string
  registerValidTime: Date
  resetValidTime: Date
}

class AuthStore {
  @observable state: IUser
  autoSave: IReactionDisposer
  constructor() {
    const state = localStorage.getItem('auth_state')
    if (state) {
      try {
        this.state = JSON.parse(state)
      } catch (error) {
        console.log('非法本地存储', error)
      }
    }

    this.autoSave = autorun(() => {
      localStorage.setItem('auth_state', JSON.stringify(this.state))
    })
  }

  @action setRegisterValidTime() {
    this.state.registerValidTime = new Date()
  }

  @action setResetValidTime() {
    this.state.resetValidTime = new Date()
  }

  @action signOut() {
    this.state.id = ''
    this.state.email = ''
  }
}

export default AuthStore
