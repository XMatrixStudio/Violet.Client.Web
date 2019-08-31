import React, { useEffect } from 'react'
import './App.less'
import { BrowserRouter, Route } from 'react-router-dom'
import { useLocalStore } from 'mobx-react-lite'
import { createStore, storeContext } from '../../Store'
import UserService from '../../services/UserService'
import LoginMain from './Login/LoginMain';
import { LoginSide } from './Login/LoginSide';


const App: React.FC = () => {
  // 创建全局 Store
  const store = useLocalStore(createStore)

  useEffect(() => {
    // 获取用户信息
    UserService.fetchUserInfo(store)
  })

  return (
    <storeContext.Provider value={store}>
      <div className="app">
        <BrowserRouter>
          <div className="app-side">
            <Route path="/" component={LoginSide} />
          </div>
          <div className="app-main">
            <Route path="/" component={LoginMain} />
          </div>
        </BrowserRouter>
      </div>
    </storeContext.Provider>
  )
}

export default App
