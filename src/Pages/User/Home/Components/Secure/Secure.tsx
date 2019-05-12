import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import SecureInfo from './SecureInfo'
import EditPassword from './EditPassword'
import EditEmail from './EditEmail'
import EditPhone from './EditPhone'
import UserStore from 'src/Store/UserStore'
import { inject, observer } from 'mobx-react'

@inject('UserStore')
@observer
class Secure extends Component<{ UserStore?: UserStore }> {
  updateInfo = (isEdit: boolean) => {
    if (isEdit) {
      this.props.UserStore!.UpdateInfo()
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path='/user/secure/phone'>
            <EditPhone finish={this.updateInfo} />
          </Route>
          <Route path='/user/secure/email' component={EditEmail}>
            <EditEmail finish={this.updateInfo} />
          </Route>
          <Route path='/user/secure/password' component={EditPassword}>
            <EditPassword finish={this.updateInfo} />
          </Route>
          <Route path='/user/secure' component={SecureInfo} />
        </Switch>
      </div>
    )
  }
}

export default Secure
