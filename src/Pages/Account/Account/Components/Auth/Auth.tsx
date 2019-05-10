import React, { Component } from 'react'
import './Auth.less'
import { Icon, Popover, message, Skeleton, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import AuthForm from './AuthForm'

import ImgIcytown from '@/Assets/icytown.png'
import ImgLogo from '@/Assets/logo.svg'
import { observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router'
import { observable, action } from 'mobx'
import UserService from 'src/Services/UserService'
import ServiceTool from 'src/Services/ServiceTool'
import RouterUtil from '../Util/RouterUtil'

interface IAuth extends RouteComponentProps<any> {
  form: WrappedFormUtils
}

@observer
class Auth extends Component<IAuth> {
  @observable errorText?: string
  @observable userInfo?: Type.UserInfoData

  @action
  componentDidMount() {
    document.title = '授权 | Violet'
    const params = RouterUtil.getParams(this.props.location.search)
    if (
      params.client_id === undefined ||
      params.state === undefined ||
      params.redirect_url === undefined
    ) {
      this.errorText = '授权链接无效'
    } else {
      UserService.GetInfo(
        info => {
          // 已登录
          this.userInfo = info
          this.getAuthInfo(params.client_id!)
        },
        () => {
          // 未登录
          this.props.history.push('/account' + this.props.location.search)
        }
      )
    }
  }

  getAuthInfo = (id: string) => {
    UserService.GetAuthByID(id)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        ServiceTool.errorHandler(error, msg => {
          message.error('无法获取授权信息, ' + msg)
        })
      })
  }

  render() {
    if (this.errorText !== undefined) {
      return (
        <div className='comp-auth'>
          <div className='error-text'>{this.errorText}</div>
          <Button
            type='primary'
            onClick={() => {
              this.props.history.goBack()
            }}
          >
            关闭
          </Button>
        </div>
      )
    }

    if (this.userInfo === undefined) {
      return (
        <div className='comp-auth'>
          <Skeleton active={true} />
        </div>
      )
    }

    return (
      <div className='comp-auth'>
        <div className='info'>
          <img className='avatar' src={this.userInfo.info.avatar} />
          <p>{this.userInfo.info.nickname}</p>
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
