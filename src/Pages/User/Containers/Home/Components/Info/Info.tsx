import './Info.less'
import React, { Component } from 'react'

import TestAvatar from '@/Assets/avatar.jpg'
import { Icon, Button } from 'antd'

class Info extends Component {
  render() {
    return (
      <div className='info-content'>
        <div className='top-info'>
          <img className='user-avatar' src={TestAvatar} />
          <div className='edit-div'>
            <Icon type='edit' />
          </div>
          <div className='user-base-info'>
            <p className='user-name'>ZhenlyChen</p>
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
            <p className='info-text'>+86-18823066231</p>
          </div>
          <div className='info-box'>
            <p className='info-title'>地区</p>
            <p className='info-text'>中国</p>
          </div>
          <div className='info-box'>
            <p className='info-title'>生日</p>
            <p className='info-text'>1987/6/5</p>
          </div>
          <Button>编辑个人信息</Button>
          <p className='info-help-text'>
            * 使用 Violet 服务的其他用户可能会看到部分信息。
          </p>
        </div>
      </div>
    )
  }
}

export default Info
