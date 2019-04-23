import React, { Component } from 'react'
import './Login.less'
import LoginForm from './LoginForm'

class Login extends Component {
  componentDidMount() {
    document.title = '登陆 | Violet'
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
