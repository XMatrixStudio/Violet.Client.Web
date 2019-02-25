import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import Message from './Message'

class MessageIndex extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/user/message' component={Message} />
        </Switch>
      </div>
    )
  }
}

export default MessageIndex
