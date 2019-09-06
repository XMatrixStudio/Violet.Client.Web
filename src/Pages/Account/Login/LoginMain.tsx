/***
 * 登陆主界面
 */
import React from 'react'
import './LoginMain.less'
import { useObserver } from 'mobx-react-lite'
import useRouter from 'use-react-router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Switch, Route } from 'react-router'
import LoginForm from './Form/LoginForm'
import AuthForm from './Form/AuthForm'

export default LoginMain

function LoginMain() {
  const { location } = useRouter()

  return useObserver(() => (
    <div className='layout-login-main'>
      <TransitionGroup style={{ width: '100%' }}>
        <CSSTransition
          key={location.pathname}
          classNames={{
            enter: 'animated fadeIn faster'
          }}
          exit={false}
          timeout={1000}
        >
          <Switch>
            <Route path='/account/auth' component={AuthForm} />
            <Route path='/account' component={LoginForm} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  ))
}
