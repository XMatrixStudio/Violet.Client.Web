import React, { Component } from 'react'
import './Auth.less'
import { Icon, Popover, Card } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import AuthForm from './Components/AuthForm'

import ImgIcytown from '@/Assets/icytown.png'
import ImgLogo from '@/Assets/logo.svg'
import UserService from 'src/Services/UserService'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

interface IAuth {
  form: WrappedFormUtils
}

@observer
class Auth extends Component<IAuth> {
  @observable userName: string
  @observable userAvatar: string

  constructor(props: IAuth) {
    super(props)
    UserService.GetInfo(info => {
      console.log(info)
      this.userName = info.nickname
      this.userAvatar = info.avatar
    })
  }

  public render() {
    return (
      <div className='comp-auth'>
        <div className='banner'>
          <Popover
            content={
              <div>
                <p>Icytown博客评论系统</p>
                <p>
                  By{' '}
                  <a href='github.com/MegaShow' target='_blank'>
                    {' '}
                    MegaShow
                  </a>
                </p>
                <a href='https://icytown.com' target='_blank'>
                  https://icytown.com
                </a>
              </div>
            }
            title='Icytown'
          >
            <img src={ImgIcytown} />
          </Popover>
          <Icon className='icon-check' type='check-circle' theme='filled' />
          <img src={ImgLogo} />
          <div className='my-line' />
        </div>
        <Card className='auth-card'>
          <div className='info'>
            <img className='avatar' src={this.userAvatar} />
            <p>{this.userName}</p>
          </div>
          <div className='client'>
            <p>
              您将授予 <strong>Icytown</strong>以下权限：
            </p>
          </div>
          <AuthForm />
        </Card>
      </div>
    )
  }
}

export default Auth
