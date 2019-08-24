import React, { Component } from 'react'
import Message from './Message'
import './Index.less'
import { inject, observer } from 'mobx-react'
import UIStore from 'src/Store/UIStore'

interface IMessageIndex {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class MessageIndex extends Component<IMessageIndex> {
  componentWillMount() {
    document.title = '通知消息 | Violet'
    this.props.UIStore!.setTitle('通知消息', '你有7条未读消息')
  }

  render() {
    return (
      <div className='message-layout'>
        <Message />
      </div>
    )
  }
}

export default MessageIndex
