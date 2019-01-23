import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import Login from '../../Components/Login/Login'
import Register from '../../Components/Register/Register'
import Auth from '../../Components/Auth/Auth'
import Reset from '../../Components/Reset/Reset'
import './Account.less'

class Account extends Component {
  public render() {
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
        <Switch>
          <Route exact={true} path='/account' component={Login} />
          <Route path='/account/register' component={Register} />
          <Route path='/account/auth' component={Auth} />
          <Route path='/account/reset' component={Reset} />
        </Switch>
      </div>
    )
  }
}

export default Account
