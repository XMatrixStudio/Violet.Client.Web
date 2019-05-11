import React, { Component } from 'react'
import './Auth.less'
import { Icon, Skeleton, Button } from 'antd'
import AuthForm from './AuthForm'

import ImgIcytown from '@/Assets/icytown.png'
import ImgLogo from '@/Assets/logo.svg'
import { observer } from 'mobx-react'
import { RouteComponentProps, withRouter } from 'react-router'
import { observable, action } from 'mobx'
import UserService from 'src/Services/UserService'
import RouterUtil from '../Util/RouterUtil'
import AppInfoModal from './AppInfoModal'

interface IAuth extends RouteComponentProps<any> {
  appInfo?: Type.AppInfoData
}

@observer
class Auth extends Component<IAuth> {
  @observable errorText?: string
  @observable userInfo?: Type.UserInfoData
  @observable showInfoModal = false

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
        // 未授权
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

    if (this.userInfo === undefined || this.props.appInfo === undefined) {
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
          <AppInfoModal
            visible={this.showInfoModal}
            close={() => {
              this.showInfoModal = false
            }}
            appInfo={this.props.appInfo}
          />
          <p>
            您将授予{' '}
            <strong
              onClick={() => {
                this.showInfoModal = true
              }}
            >
              {this.props.appInfo.info.displayName}
            </strong>{' '}
            以下权限：
          </p>
        </div>
        <AuthForm />
      </div>
    )
  }
}

export default withRouter(Auth)
