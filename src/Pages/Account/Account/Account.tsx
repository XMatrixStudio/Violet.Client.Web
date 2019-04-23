import React, { Component } from 'react'
import './Account.less'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Auth from './Components/Auth/Auth'
import Reset from './Components/Reset/Reset'
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router'

interface IAccountProps extends RouteComponentProps<any> {}

class Account extends Component<IAccountProps> {
  colorfulTop = (pathname: string) => {
    console.log(pathname)
    if (pathname === '/account') {
      return 'login-card'
    } else if (pathname.includes('/account/register')) {
      return 'register-card'
    } else if (pathname.includes('/account/reset')) {
      return 'reset-card'
    } else if (pathname.includes('/account/auth')) {
      return 'auth-card'
    }
    return ''
  }

  render() {
    return (
      <div className='account-div'>
        <p
          className='account-title'
          onClick={() => {
            window.location.href = '/' // 返回主页
          }}
        >
          Violet
        </p>
        <div
          className={
            'base-card-box ' + this.colorfulTop(this.props.location.pathname)
          }
        >
          <TransitionGroup>
            <CSSTransition
              key={this.props.location.pathname}
              classNames={{
                appear: 'animated fadeIn',
                appearActive: 'animated fadeIn',
                appearDone: 'animated fadeIn',
                enter: 'animated fadeIn',
                enterActive: 'animated fadeIn',
                enterDone: 'animated fadeIn'
              }}
              exit={false}
              timeout={300}
            >
              <Switch>
                <Route exact={true} path='/account' component={Login} />
                <Route path='/account/register' component={Register} />
                <Route path='/account/auth' component={Auth} />
                <Route path='/account/reset' component={Reset} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

export default withRouter(Account)
