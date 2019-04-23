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
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.pathname}
            classNames='fade'
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
    )
  }
}

export default withRouter(Account)
