import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import Message from './Message'
import './Index.less'

class MessageIndex extends Component {
  render() {
    return (
      <div className='message-layout'>
        <div className='top-layout'>
          <div className='top-text'>
            <p className='title'>通知信息</p>
            <p className='sub-title'>查看通知或者收发信息</p>
          </div>
          <div className='right-text'>
            未读信息: <strong>7</strong>
          </div>
        </div>
        <Switch>
          <Route path='/user/message' component={Message} />
        </Switch>
      </div>
    )
  }
}

export default MessageIndex
