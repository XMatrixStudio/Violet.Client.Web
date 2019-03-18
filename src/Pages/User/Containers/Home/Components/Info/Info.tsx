import './Info.less'
import React, { Component } from 'react'

import ShowInfo from './ShowInfo'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'
import EditInfo from './EditInfo'
import Nothing from '../Nothing/Nothing'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import UserService from 'src/Services/UserService'
import { message } from 'antd'

interface IInfoProps extends RouteComponentProps<any> {}

@observer
class Info extends Component<IInfoProps, any> {
  @observable userInfo: User.GET.ResponseBody = {
    name: '',
    level: 0,
    createTime: new Date(),
    info: {
      avatar: '',
      bio: '',
      birthday: new Date(),
      email: '',
      gender: 0,
      location: '',
      nickname: '',
      phone: '',
      url: ''
    }
  }

  updateInfo = () => {
    UserService.GetInfo(
      data => {
        this.userInfo = data
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
            <EditInfo updateData={this.updateInfo} userInfo={this.userInfo} />
          </Route>
          <Route exact={true} path='/user/info'>
            <ShowInfo
              onClickEdit={() => {
                this.props.history.push('/user/info/edit')
              }}
              userInfo={this.userInfo}
            />
          </Route>
          <Route component={Nothing} />
        </Switch>
      </div>
    )
  }
}

export default Info
