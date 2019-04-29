import React, { Component } from 'react'
import { Popover, Button, Icon, Skeleton, message } from 'antd'

import UserLevel from './UserLevel'

import './UserCard.less'
import { observable, action, runInAction } from 'mobx'
import { observer } from 'mobx-react'
import UserService from 'src/Services/UserService'
import ServiceTool from 'src/Services/ServiceTool'

interface IUserCard {
  name: string
}

@observer
class UserCard extends Component<IUserCard> {
  @observable userInfo: Type.UserInfoData
  loading = false
  @observable error = false

  @action
  onVisibleChange = (visible: boolean) => {
    if (visible && !this.loading && this.userInfo === undefined) {
      this.loading = true
      UserService.GetUserInfo(this.props.name)
        .then(res => {
          runInAction(() => {
            this.userInfo = res.data
            this.loading = false
          })
        })
        .catch(error => {
          ServiceTool.errorHandler(error, msg => {
            message.error('用户不存在')
            this.error = true
          })
        })
    }
  }

  render() {
    if (this.error) {
      return <span>用户已注销</span>
    }
    const CardContent =
      this.userInfo === undefined ? (
        <Skeleton active={true} />
      ) : (
        <div className='own-info'>
          <img className='user-avatar' src={this.userInfo.info.avatar} />
          <p className='user-name'>
            {this.userInfo.info.nickname}
            <Icon type='man' className='gender-man gender-icon' />
          </p>
          <UserLevel level={this.userInfo.level} />
          {this.userInfo.info.location && (
            <p>地区: {this.userInfo.info.location}</p>
          )}
          {this.userInfo.info.email && (
            <p>联系邮箱: {this.userInfo.info.email}</p>
          )}
          {this.userInfo.info.phone && (
            <p>联系电话: {this.userInfo.info.phone}</p>
          )}
          <Button icon='message'>联系</Button>
        </div>
      )

    return (
      <Popover
        placement='rightTop'
        content={<div className='user-popover-box'>{CardContent}</div>}
        onVisibleChange={this.onVisibleChange}
      >
        <span className='own-name'>
          {this.props.children || this.props.name}
        </span>
      </Popover>
    )
  }
}

export default UserCard
