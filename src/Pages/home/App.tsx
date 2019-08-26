import React, { useEffect } from 'react'
import './App.less'

// store
import { createStore, storeContext } from '../../Store'
import { useLocalStore } from 'mobx-react-lite'
// pages
import Main from './main'
import NavBar from './components/NavBar'
import UserService from '../../services/UserService';

const App: React.FC = () => {
  // 创建全局 Store
  const store = useLocalStore(createStore)

  // 获取用户信息
  useEffect(() => {
    UserService.fetchUserInfo(store)
  })

  return (
    <storeContext.Provider value={store}>
      <div className="app">
        <NavBar />
        <Main />
      </div>
    </storeContext.Provider>
  )
}

export default App
