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

const App: React.FC = () => {
  // 创建全局 Store
  const store = useLocalStore(createStore)

  const { location } = useRouter()

  useEffect(() => {
    // 获取用户信息
    UserService.fetchUserInfo(store)
    // eslint-disable-next-line
  }, [])

  //  保存全局状态
  useEffect(
    () =>
      autorun(() => {
        console.log('save')
        localStorage.setItem('violet_store', JSON.stringify(store))
      }),
    // eslint-disable-next-line
    []
  )

  return useObserver(() => (
    <storeContext.Provider value={store}>
      <div className='app'>
        <div className='app-side'>
          <Switch>
            <Route path='/account/reset' component={ResetSide} />
            <Route path='/account/register' component={RegisterSide} />
            <Route exact={true} path='/account' component={LoginSide} />
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
                <Route exact={true} path='/account' component={LoginMain} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </storeContext.Provider>
  ))
}

export default App
