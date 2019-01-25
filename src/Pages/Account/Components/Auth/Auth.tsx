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
          <Popover content={this.popoverContent} title='Icytown'>
            <img src={ImgIcytown} />
          </Popover>
          <Icon className='icon-check' type='check-circle' theme='filled' />
          <img src={ImgLogo} />
          <div className='my-line' />
        </div>
        <Card className='auth-card'>
          <div className='info'>
            <img className='avatar' src={ImgAvatar} />
            <p>ZhenlyChen</p>
          </div>
          <div className='client'>
            <p>
              您将授予 <strong>Icytown</strong>以下权限：
            </p>
          </div>
          <AuthForm />
        </Card>
      </div>
  }
}

export default Auth
