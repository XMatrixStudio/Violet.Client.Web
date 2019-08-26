import React, { useEffect } from 'react'
import './App.less'
import { BrowserRouter } from 'react-router-dom';
import { useLocalStore } from 'mobx-react-lite';
import { createStore, storeContext } from '../../Store';
import UserService from '../../services/UserService';

const App: React.FC = () => {
  // 创建全局 Store
  const store = useLocalStore(createStore)

  useEffect(() => {
    // 获取用户信息
    UserService.fetchUserInfo(store)

    const params = UtilTool.getParams(this.props.location.search)
    if (params.valid) {
      DevService.getAppInfoById(params.appId)
        .then(res => {
          runInAction(() => {
            this.appInfo = res.data
            this.title = (
              <span key='title'>
                使用 Violet 登陆{' '}
                <strong key='app-name'>{res.data.info.displayName}</strong>
              </span>
            )
          })
        })
        .catch(error => {
          ServiceTool.errorHandler(error, msg => {
            message.error('无效的应用')
            this.props.history.push('/account-m/auth')
          })
        })
    }


  })

  const colorfulTop = (pathname: string) => {
    if (pathname === '/account-m') {
      return 'login-card'
    } else if (pathname.includes('/account-m/register')) {
      return 'register-card'
    } else if (pathname.includes('/account-m/reset')) {
      return 'reset-card'
    } else if (pathname.includes('/account-m/auth')) {
      return 'auth-card'
    }
    return ''
  }

  return (
    <storeContext.Provider value={store}>
      <div className="app">
        <BrowserRouter>
          <div>

          </div>
        </BrowserRouter>
      </div>
    </storeContext.Provider>
  )
}

export default App
