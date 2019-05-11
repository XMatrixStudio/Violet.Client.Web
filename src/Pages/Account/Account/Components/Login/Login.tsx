import React, { Component } from 'react'
import './Login.less'
import LoginForm from './LoginForm'
import RouterUtil from '../Util/RouterUtil'
import { RouteComponentProps } from 'react-router'
import UserService from 'src/Services/UserService'

interface ILoginProps extends RouteComponentProps<any> {}

class Login extends Component<ILoginProps> {
  componentDidMount() {
    document.title = '登陆 | Violet'
    const params = RouterUtil.getParams(this.props.location.search)
    UserService.GetInfo(info => {
      if (!params.valid) {
        window.location.href = '/user/info'
      } else {
        this.props.history.push('/account/auth' + this.props.location.search)
      }
    })
  }
  public render() {
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
