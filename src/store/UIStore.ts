import { makeAutoObservable } from "mobx"
import { RootStore } from "./RootStore"

export interface UIData {
  count: number
}

export class UIStore {

  rootStore

  data: UIData

  constructor(rootStore: RootStore, init: UIData | null = null) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
    this.data = init || {
      count: 0
    }
  }

  get count() {
    return this.rootStore.ui.data.count
  }

  add() {
    console.log(this.rootStore.ui.data.count)
    this.rootStore.ui.data.count++
  }
}