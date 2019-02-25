import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import SecureInfo from './SecureInfo'
import EditPassword from './EditPassword'
import EditEmail from './EditEmail'
import EditPhone from './EditPhone'

class Secure extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/user/secure/phone' component={EditPhone} />
          <Route path='/user/secure/email' component={EditEmail} />
          <Route path='/user/secure/password' component={EditPassword} />
          <Route path='/user/secure' component={SecureInfo} />
        </Switch>
      </div>
    )
  }
}

export default Secure
