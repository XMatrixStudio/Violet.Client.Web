import './Info.less'
import React, { Component } from 'react'

import ShowInfo from './ShowInfo'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'
import EditInfo from './EditInfo'
import Nothing from '../Nothing/Nothing'
import { observer, inject } from 'mobx-react'
import UserStore from 'src/Store/UserStore'
import AvatarSelect from '../Common/AvatarSelect'
import UserLevel from '../Common/UserLevel'
import { Tooltip, Icon } from 'antd'
import TopBanner from '../Common/TopBanner'
import UIStore from 'src/Store/UIStore'
import { observable, autorun } from 'mobx'

interface IInfoProps extends RouteComponentProps<any> {
  UserStore?: UserStore
  UIStore?: UIStore
}

@inject('UserStore', 'UIStore')
@observer
class Info extends Component<IInfoProps, any> {
  @observable nickname: string
  userAvatar?: File

  componentDidMount() {
    autorun(() => {
      this.props.UIStore!.setTitle(
        'Hi, ' + this.props.UserStore!.state.info.info.nickname,
        '',
        this.tip()
      )
    })
  }

  updateInfo = () => {
    this.props.UserStore!.updateInfo(() => {
      window.location.href = '/account'
    })
  }

  tip = () => {
    const hour = new Date().getHours()
    if (hour < 5) {
      return '夜已深，请注意休息'
    } else if (hour < 8) {
      return '好早啊'
    } else if (hour < 11) {
      return '忙碌的一天又开始了'
    } else if (hour < 14) {
      return '中午好'
    } else if (hour < 17) {
      return '下午好晒啊'
    } else if (hour < 20) {
      return '吃晚饭了吗'
    } else if (hour < 22) {
      return '好饱啊'
    } else {
      return '快睡觉啦'
    }
  }

  render() {
    const data = this.props.UserStore!.state.info
    return (
      <div className='info-content'>
        <TopBanner />
        <div className='content-box'>
          <div className='base-card-box top-card'>
            <div className='user-avatar'>
              <AvatarSelect
                imageURL={data.info.avatar}
                setImage={file => {
                  this.userAvatar = file
                }}
                title='点击或拖动选择头像'
              />
            </div>
            <div className='user-base-info'>
              <div>
                <span className='user-name'>{data.info.nickname}</span>
                <UserLevel level={data.level} />
                <Tooltip title='这是什么？'>
                  <Icon
                    style={{ fontSize: '18px', cursor: 'pointer' }}
                    type='question-circle'
                    theme='twoTone'
                    twoToneColor='#71cdd2'
                  />
                </Tooltip>
              </div>
              <p className='user-bio'>{data.info.bio || '这里是个人简介'}</p>
            </div>
          </div>

          <Switch>
            <Route exact={true} path='/user/info/edit'>
              <EditInfo
                next={isEdit => {
                  if (isEdit) {
                    this.updateInfo()
                  }
                  this.props.history.replace('/user/info')
                }}
                userInfo={data}
              />
            </Route>
            <Route exact={true} path='/user/info'>
              <ShowInfo userInfo={data} />
            </Route>
            <Route component={Nothing} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Info
