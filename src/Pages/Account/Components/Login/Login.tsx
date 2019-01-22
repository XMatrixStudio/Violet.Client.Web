import React, { Component } from 'react'
import './Login.less'
import { Card } from 'antd'

class Login extends Component {
  public render() {
    return (
      <div className='comp-login'>
        <Card className='login-card' bodyStyle={{ textAlign: 'center' }}>
          <div className='title'>
            <p className='login-to'>登陆</p>
            <div className='line' />
          </div>
        </Card>
      </div>
    )
  }
}

export default Login
