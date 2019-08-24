import React, { Component } from 'react'
import './Login.less'
import LoginForm from './LoginForm'
import RouterUtil from '../Util/RouterUtil'
import { RouteComponentProps } from 'react-router'
import UserService from 'src/Services/UserService'

interface ILoginProps extends RouteComponentProps<any> {}

class Login extends Component<ILoginProps> {
  componentWillMount() {
    document.title = '登陆 | Violet'
    if (
      this.props.location.state &&
      this.props.location.state.isLogin === false
    ) {
      // 清除状态
      const state = { ...this.props.history.location.state }
      delete state.isLogin
      this.props.history.replace({ ...this.props.history.location, state })
    } else {
      const params = RouterUtil.getParams(this.props.location.search)
      UserService.GetInfo(info => {
        // 当前已登陆，直接跳转
        if (!params.valid) {
          window.location.href = '/user/info'
        } else {
          this.props.history.push('/account/auth' + this.props.location.search)
        }
      })
    }
  }

  render() {
    return (
      <div className='comp-login'>
        <div className='card-title'>
          <p className='title-to'>登 陆</p>
          <div className='line' />
        </div>
        <LoginForm />
      </div>
    )
  }
}

export default Login
