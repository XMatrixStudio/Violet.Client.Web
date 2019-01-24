import React, { Component } from 'react'
import './Login.less'
import { Card } from 'antd'
import LoginForm from './Components/LoginForm'

class Login extends Component {
  public render() {
    return (
      <div className='comp-login'>
        <Card className='account-card' bodyStyle={{ textAlign: 'center' }}>
          <div className='card-title'>
            <p className='title-to'>登 陆</p>
            <div className='line' />
          </div>
          <LoginForm />
        </Card>
      </div>
    )
  }
}

export default Login
