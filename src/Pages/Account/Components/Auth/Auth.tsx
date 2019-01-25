import React, { Component } from 'react'
import './Auth.less'
import { Icon, Popover, Card} from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import AuthForm from './Components/AuthForm'

import ImgIcytown from '@/Assets/icytown.png'
import ImgAvatar from '@/Assets/avatar.jpg'
import ImgLogo from '@/Assets/logo.svg'

class Auth extends Component<{form: WrappedFormUtils}> {

  popoverContent = (
      <div>
        <p>Icytown博客评论系统</p>
        <p>By <a href="github.com/MegaShow" target="_blank"> MegaShow</a>
        </p>
        <a href="https://icytown.com" target="_blank">https://icytown.com</a>
      </div>
    )

  public render() {
    return <div className='comp-auth'>
        <div className='banner'>
          <img src={ImgIcytown} />
          <Icon className='icon-check' type='check-circle' theme='filled' />
          <img src={ImgLogo} />
          <div className='my-line' />
        </div>
        <p className='help-text'>
          授权
          <Popover content={this.popoverContent} title='Icytown'>
            <strong>Icytown</strong>
          </Popover>
          访问你的信息
        </p>
        <Card className='auth-card'>
          <div className='info'>
            <img className='avatar' src={ImgAvatar} />
          <p>ZhenlyChen</p>
        </div>
        <AuthForm popoverContent={this.popoverContent} />
        </Card>
      </div>
  }
}

export default Auth
