import './Info.less'
import React, { Component } from 'react'

import ShowInfo from './ShowInfo'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'
import EditInfo from './EditInfo'
import Nothing from '../Nothing/Nothing'
import { observer, inject } from 'mobx-react'
import UserService from 'src/Services/UserService'
import { message } from 'antd'
import UserStore from 'src/Store/UserStore'

interface IInfoProps extends RouteComponentProps<any> {
  UserStore?: UserStore
}

@inject('UserStore')
@observer
class Info extends Component<IInfoProps, any> {
  updateInfo = () => {
    UserService.GetInfo(
      data => {
        this.props.UserStore!.setInfo(data)
      },
      () => {
        message.error('请先登陆')
        this.props.history.replace('/account')
      }
    )
  }

  componentDidMount() {
    this.updateInfo()
  }

  render() {
    return (
      <div className='info-content'>
        <Switch>
          <Route exact={true} path='/user/info/edit'>
            <EditInfo
              updateData={this.updateInfo}
              userInfo={this.props.UserStore!.state.info}
            />
          </Route>
          <Route exact={true} path='/user/info'>
            <ShowInfo
              onClickEdit={() => {
                this.props.history.push('/user/info/edit')
              }}
              userInfo={this.props.UserStore!.state.info}
            />
          </Route>
          <Route component={Nothing} />
        </Switch>
      </div>
    )
  }
}

export default Info
