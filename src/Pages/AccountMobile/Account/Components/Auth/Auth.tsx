import React, { Component } from 'react'
import './Auth.less'
import { Icon, Skeleton, Button } from 'antd'
import AuthForm from './AuthForm'

import { observer } from 'mobx-react'
import { RouteComponentProps, withRouter } from 'react-router'
import { observable, action } from 'mobx'
import UserService from 'src/Services/UserService'
import RouterUtil from '../Util/RouterUtil'
import AppInfoModal from './AppInfoModal'
import ServiceTool from 'src/Services/ServiceTool'

interface IAuth extends RouteComponentProps<any> {
  appInfo?: Type.AppInfoData
}

@observer
class Auth extends Component<IAuth> {
  @observable errorText?: string
  @observable userInfo?: Type.UserInfoData
  @observable showInfoModal = false
  params: Type.AuthParams

  @action
  componentWillMount() {
    document.title = '授权 | Violet'
    this.params = RouterUtil.getParams(this.props.location.search)
    if (!this.params.valid) {
      this.errorText = '授权链接无效'
    } else {
      UserService.GetInfo(
        info => {
          // 已登录
          this.userInfo = info
          if (this.params.quickMode) {
            this.getAuthInfo()
          }
        },
        () => {
          // 未登录
          this.props.history.push('/account' + this.props.location.search, {
            isLogin: false
          })
        }
      )
    }
  }

  getAuthInfo = (id?: string) => {
    if (!id) {
      id = this.params.appId
    }
    UserService.GetAuthByID(id, this.params.redirectUrl)
      .then(res => {
        // 已授权，直接跳转
        window.location.href =
          this.params.redirectUrl +
          '?code=' +
          res.data.code +
          '&state=' +
          this.params.state
      })
      .catch(error => {
        ServiceTool.errorHandler(error, msg => {
          if (msg === 'error_redirect_url') {
            this.errorText = '非法回调地址'
          } else if (msg === 'not_exist_app') {
            this.errorText = '非法应用信息'
          } else if (msg !== 'not_exist_auth') {
            this.errorText = '获取授权信息失败, ' + msg
          }
        })
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
              window.close()
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
          <div className='banner'>
            <img className='avatar' src={this.userInfo.info.avatar} />
            <Icon
              className='icon-check'
              type='safety-certificate'
              twoToneColor='#33a849'
              theme='twoTone'
            />
            <img src={this.props.appInfo.info.avatar} />
            <p>{this.userInfo.info.nickname}</p>
          </div>
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
        <AuthForm
          next={(ok, msg) => {
            if (ok) {
              this.getAuthInfo()
            } else {
              this.errorText = msg
            }
          }}
          params={this.params}
        />
      </div>
    )
  }
}

export default withRouter(Auth)
