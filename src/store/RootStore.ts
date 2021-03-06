import { autorun } from "mobx"
import React from "react"
import { UIData, UIStore } from "./UIStore"
import { UserData, UserStore } from "./UserStore"

export const StoreContext = React.createContext<RootStore | null>(null)

interface LocalStore {
  user: UserData | null
  ui: UIData | null
}

export class RootStore {
  STORE_KEY = 'violet_store'
  ui
  user
  constructor() {

    // 加载本地存储
    const savedStore = localStorage.getItem(this.STORE_KEY)
    let store: LocalStore | null = null

    if (
      savedStore !== null &&
      savedStore !== undefined &&
      savedStore !== 'undefined'
    ) {
      try {
        store = JSON.parse(savedStore) as LocalStore

      } catch (error) {
        console.log('无效的本地存储', error)
        localStorage.removeItem(this.STORE_KEY)
      }
    }

    // 初始化全局存储
    this.ui = new UIStore(this, store?.ui)
    this.user = new UserStore(this, store?.user)
  }

  // 保存存储
  saveStore() {
    let store: LocalStore = {
      user: null,
      ui: null
    }
    store.user = this.user.data
    store.ui = this.ui.data
    localStorage.setItem(this.STORE_KEY, JSON.stringify(store))
    // console.log('save:' + JSON.stringify(store))
  }
}

export function useGlobalStore() {
  const store = React.useContext(StoreContext)
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.')
  }
  return store
}

export const rootStore = new RootStore()

autorun(() => {
  rootStore.saveStore()    
})