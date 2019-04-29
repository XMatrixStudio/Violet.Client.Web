import React, { Component } from 'react'
import './Setting.less'
import { observer, inject } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import UserStore from 'src/Store/UserStore'
import { Switch, Route } from 'react-router'
import SettingIndex from './SettingIndex'
import RequestList from './RequestList/RequestList'

interface ISettingProps {
  UIStore?: UIStore
  UserStore?: UserStore
}

@inject('UIStore', 'UserStore')
@observer
class Setting extends Component<ISettingProps> {
  render() {
    return (
      <div className='setting-content'>
        <Switch>
          <Route path='/user/setting/request' component={RequestList} />
          <Route component={SettingIndex} />
        </Switch>
      </div>
    )
  }
}

export default Setting
