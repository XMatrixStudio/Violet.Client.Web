import { makeAutoObservable } from "mobx"
import { RootStore } from "./RootStore"
import { DataType } from '@/service/type'


export interface UserData extends DataType.UserInfoData {}

export class UserStore {

  rootStore

  data: UserData | null

  constructor(rootStore: RootStore, init: UserData | null = null) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore;
    this.data = init
  }

  get userInfo() {
    return this.data
  }

  setCurrentUser(data: UserData | null) {
    this.data = data
  }
}