import './Info.less'
import React, { Component } from 'react'

import ShowInfo from './ShowInfo'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'
import EditInfo from './EditInfo'
import Nothing from '../Nothing/Nothing'
import { observer, inject } from 'mobx-react'
import UserStore from 'src/Store/UserStore'
import AvatarSelect from '../Utils/AvatarSelect'
import UserLevel from '../Utils/UserLevel'
import { Tooltip, Icon } from 'antd'

interface IInfoProps extends RouteComponentProps<any> {
  UserStore?: UserStore
}

@inject('UserStore')
@observer
class Info extends Component<IInfoProps, any> {
  userAvatar?: File
  updateInfo = () => {
    this.props.UserStore!.updateInfo(() => {
      window.location.href = '/account'
    })
  }

  render() {
    const data = this.props.UserStore!.state.info
    return (
      <div className='info-content'>
        <div className='show-info'>
          <div className='top-banner'>
            <div className='top-title'>
              <p className='big-title'>Hi, {data.info.nickname}</p>
              <p className='sub-title'>夜已深, 请注意休息</p>
            </div>
            <div className='box-1' />
            <div className='box-2' />
            <div className='box-3' />
          </div>
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
      </div>
    )
  }
}

export default Info
