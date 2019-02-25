import React, { Component } from 'react'

import TestAvatar from '@/Assets/avatar.jpg'
import { Icon, Button, Tooltip, Tag } from 'antd'

interface IShowInfoProps {
  onClickEdit: () => void
}

class ShowInfo extends Component<IShowInfoProps, any> {
  render() {
    return (
      <div>
        <div className='top-info'>
          <img className='user-avatar' src={TestAvatar} />
          <div className='edit-div'>
            <Tooltip placement='bottom' title='修改头像'>
              <Icon type='edit' />
            </Tooltip>
          </div>
          <div className='user-base-info'>
            <p>
              <span className='user-name'>ZhenlyChen</span>
              <Tag className='user-tag' color='green'>
                管理员
              </Tag>
            </p>

            <p className='user-bio'>我好菜啊</p>
          </div>
        </div>
        <div className='more-info'>
          <div className='info-box'>
            <p className='info-title'>性别</p>
            <p className='info-text'>
              <Icon className='gender-icon gender-man' type='man' />男
            </p>
          </div>
          <div className='info-box'>
            <p className='info-title'>联系邮箱</p>
            <p className='info-text'>zhenlychen@foxmail.com</p>
          </div>
          <div className='info-box'>
            <p className='info-title'>联系电话</p>
            <p className='info-text'>+86-18823456789</p>
          </div>
          <div className='info-box'>
            <p className='info-title'>地区</p>
            <p className='info-text'>中国</p>
          </div>
          <div className='info-box'>
            <p className='info-title'>生日</p>
            <p className='info-text'>1987/6/5</p>
          </div>
          <Button onClick={this.props.onClickEdit}>编辑个人信息</Button>
          <p className='info-help-text'>
            * 使用 Violet 服务的其他用户可能会看到部分信息。
          </p>
        </div>
      </div>
    )
  }
}

export default ShowInfo
