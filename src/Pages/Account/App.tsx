import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useLocalStore, useObserver } from 'mobx-react-lite'
import { createStore, storeContext } from '@/Store'
import { autorun } from 'mobx'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import useRouter from 'use-react-router'

import './App.less'

import UserService from '@/services/UserService'

import LoginSide from './Login/LoginSide'
import LoginMain from './Login/LoginMain'
import RegisterSide from './Register/RegisterSide'
import RegisterMain from './Register/RegisterMain'
import ResetSide from './Reset/ResetSide'
import ResetMain from './Reset/ResetMain'
import { getAuthParams, errorHandler } from '@/components/UtilTool'
import DevService from '@/services/DevService'
const App: React.FC = () => {
  // 创建全局 Store
  const store = useLocalStore(createStore)

  const { history, location } = useRouter()

  useEffect(() => {
    // 获取用户信息
    UserService.fetchUserInfo(store).then(res => {
      // 未登录跳转到登陆界面
      if (res === null && location.pathname.includes('/account/auth')) {
        history.push('/account' + location.search)
      }
    })
    // 获取授权应用信息
    store.app = null
    const params = getAuthParams(location.search)
    if (params.valid) {
      DevService.getAppInfoById(params.appId)
        .then(res => {
          store.app = res.data
        })
        .catch(error => {
          errorHandler(error, msg => {
            history.push('/account/auth')
          })
        })
    }
    // 自动保存状态
    autorun(() => {
      console.log('save')
      localStorage.setItem('violet_store', JSON.stringify(store))
    })
    // 设置标题
    document.title = 'Violet'
    // eslint-disable-next-line
  }, [])

  return useObserver(() => (
    <storeContext.Provider value={store}>
      <div className='app'>
        <div className='app-side'>
          <Switch>
            <Route path='/account/reset' component={ResetSide} />
            <Route path='/account/register' component={RegisterSide} />
            <Route path='/account' component={LoginSide} />
          </Switch>
        </div>
        <div className='app-main'>
          <TransitionGroup className='layout-transition'>
            <CSSTransition
              key={location.pathname}
              classNames={{
                enter: 'animated fadeIn'
              }}
              exit={false}
              timeout={300}
            >
              <Switch location={location}>
                <Route path='/account/reset' component={ResetMain} />
                <Route path='/account/register' component={RegisterMain} />
                <Route path='/account' component={LoginMain} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </storeContext.Provider>
  ))
}

export default App
