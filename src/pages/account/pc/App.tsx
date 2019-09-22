import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useObserver } from 'mobx-react-lite'
import { storeContext } from '@/Store'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './App.less'

import { useApp } from '../core/App'

import LoginSide from './Login/LoginSide'
import LoginMain from './Login/LoginMain'
import RegisterSide from './Register/RegisterSide'
import RegisterMain from './Register/RegisterMain'
import ResetSide from './Reset/ResetSide'
import ResetMain from './Reset/ResetMain'

const App: React.FC = () => {
  const { store, location } = useApp()

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
