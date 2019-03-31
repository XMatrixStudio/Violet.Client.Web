import React, { Component } from 'react'
import { Popover, Button, Icon } from 'antd'

import UserAvatar from '@/Assets/avatar.jpg'
import UserLevel from './UserLevel'

import './UserCard.less'

interface IUserCard {
  info: {
    name: string
    level: number
  }
}

class UserCard extends Component<IUserCard> {
  render() {
    return (
      <Popover
        placement='rightTop'
        content={
          <div className='own-info'>
            <img className='user-avatar' src={UserAvatar} />
            <p className='user-name'>
              {this.props.info.name}
              <Icon type='man' className='gender-man gender-icon' />
            </p>
            <UserLevel level={this.props.info.level} />
            <p>地区: 广州</p>
            <p>联系邮箱: zhenlychen@foxmail.com</p>
            <p>联系电话: 18823456789</p>
            <Button icon='message'>联系</Button>
          </div>
        }
      >
        <span className='own-name'>{this.props.info.name}</span>
      </Popover>
    )
  }
}

export default UserCard
