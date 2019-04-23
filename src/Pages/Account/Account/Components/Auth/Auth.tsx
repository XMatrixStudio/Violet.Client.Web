import React, { Component } from 'react'
import './Auth.less'
import { Icon, Popover, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import AuthForm from './AuthForm'

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
    UserService.GetInfo(
      data => {
        this.userName = data.info.nickname
        this.userAvatar = data.info.avatar
      },
      () => {
        message.error('无法获取个人信息')
      }
    )
  }

  componentDidMount() {
    document.title = '授权 | Violet'
  }

  public render() {
    return (
      <div className='comp-auth'>
        <div className='info'>
          <img className='avatar' src={this.userAvatar} />
          <p>{this.userName}</p>
        </div>
        <div className='banner'>
          <img src={ImgIcytown} />
          <Icon className='icon-check' type='check-circle' theme='filled' />
          <img src={ImgLogo} />
          <div className='my-line' />
        </div>
        <div className='client'>
          <p>
            您将授予{' '}
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
              placement='bottom'
            >
              <strong>Icytown</strong>
            </Popover>{' '}
            以下权限：
          </p>
        </div>
        <AuthForm />
      </div>
    )
  }
}

export default Auth
