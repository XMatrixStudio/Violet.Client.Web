import { observable, action } from 'mobx'

export interface IUser {
  email: string
  id: string
}

class AuthStore {
  @observable private id: string
  @observable private email: string
  constructor() {
    this.id = ''
    this.email = ''
  }
  @action public async signIn(data: IUser) {
    try {
      this.id = data.id
      this.email = data.email
      this.setLocalStorage({
        email: this.email,
        id: this.id
      })
      return null
    } catch (error) {
      return error
    }
  }
  @action public signOut() {
    this.id = ''
    this.email = ''
    this.clearStorage()
  }

  private setLocalStorage({ id, email }: IUser) {
    localStorage.setItem('id', id)
    localStorage.setItem('email', email)
  }

  private clearStorage() {
    localStorage.clear()
  }
}

export default AuthStore
