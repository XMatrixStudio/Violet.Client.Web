import React, { Component } from 'react'
import './UserItem.less'
import UserAvatar from '@/Assets/avatar.jpg'

interface IUserItemProps {
  data: {
    name: string
    avatar: string
    nickName: string
    email: string
    phone: string
  }
}

class UserItem extends Component<IUserItemProps> {
  render() {
    return (
      <div className='user-item'>
        <img className='user-avatar' src={UserAvatar} />
      </div>
    )
  }
}

export default UserItem
