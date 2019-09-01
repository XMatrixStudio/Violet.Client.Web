import React from 'react'

export const storeContext = React.createContext<TStore | null>(null)

export interface TStore {
  user: Type.UserInfoData | null
  auth : {
      captchaTime: number,
      account: string,
  }
}

export function createStore() {
  let store: TStore = {
    user: null,
    auth: {
        account: '',
        captchaTime: 0
    }
  }
  const savedStore = localStorage.getItem('violet_store')
  if (
    savedStore !== null &&
    savedStore !== undefined &&
    savedStore !== 'undefined'
  ) {
    try {
      store = JSON.parse(savedStore) as TStore
    } catch (error) {
      console.log('非法本地存储', error)
    }
  }
  return store
}

export const useStore = () => {
  const store = React.useContext(storeContext)
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.')
  }
  return store
}
