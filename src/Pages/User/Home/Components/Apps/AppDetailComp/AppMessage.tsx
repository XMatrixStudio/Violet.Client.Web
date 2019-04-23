import React, { Component } from 'react'
import Message from '../../Message/Message'
import './AppMessage.less'

class AppMessage extends Component {
  render() {
    return (
      <div className='app-message'>
        <Message />
      </div>
    )
  }
}

export default AppMessage
