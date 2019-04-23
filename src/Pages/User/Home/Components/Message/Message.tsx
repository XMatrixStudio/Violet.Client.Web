import React, { Component } from 'react'
import { Icon, Badge, Divider, Input, Button, Tooltip } from 'antd'
import AppAvatar from '@/Assets/icytown.png'
import UserAvatar from '@/Assets/avatar.jpg'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import dateFormat from 'dateformat'
import './Message.less'

interface IMessageContent {
  time: Date
  type: string
  title?: string
  content: string
}

interface IMessageData {
  avatar: string
  lastTime: Date
  count: number
  name: string
  data: IMessageContent[]
}

@observer
class Message extends Component {
  messageData: IMessageData[]

  @observable selectIndex: number

  constructor(props: any) {
    super(props)
    this.selectIndex = -1
    this.messageData = [
      {
        avatar: '',
        lastTime: new Date(new Date().getTime() - 8434521),
        count: 3,
        name: '系统通知',
        data: [
          {
            time: new Date(new Date().getTime() - 28434521),
            type: 'notice',
            title: '辣鸡通知',
            content: '在座的各位都是辣鸡'
          },
          {
            time: new Date(new Date().getTime() - 18434521),
            type: 'notice',
            title: '咸鸡通知',
            content: '在座的各位都是秀秀'
          },
          {
            time: new Date(new Date().getTime() - 8434521),
            type: 'notice',
            title: '田鸡通知',
            content: '在座的各位都是田鸡'
          }
        ]
      },
      {
        avatar: '',
        lastTime: new Date(new Date().getTime() - 9432145),
        count: 2,
        name: 'Icytown',
        data: [
          {
            time: new Date(new Date().getTime() - 12249432145),
            type: 'message-me',
            content: '你好奇'
          },
          {
            time: new Date(new Date().getTime() - 39432145),
            type: 'notice',
            title: '辣鸡通知',
            content: '在座的各位都是辣鸡'
          },
          {
            time: new Date(new Date().getTime() - 9432145),
            type: 'message',
            content: '我好奇'
          }
        ]
      }
    ]
  }

  formatTime = (date: Date) => {
    const diffDay = new Date().getDay() - date.getDay()
    const diffYear = new Date().getFullYear() - date.getFullYear()
    if (diffYear === 0) {
      if (diffDay === 0) {
        // 今天
        return dateFormat(date, 'h:MM')
      } else if (diffDay === 1) {
        return '昨天 ' + dateFormat(date, 'h:MM')
      } else if (diffDay === 2) {
        return '前天 ' + dateFormat(date, 'h:MM')
      } else {
        return dateFormat(date, 'm/d h:MM')
      }
    } else {
      return dateFormat(date, 'yyyy/m/d h:MM')
    }
  }

  render() {
    const messageList = this.messageData.map(
      (value: IMessageData, index: number) => (
        <div key={value.name}>
          <div
            className={
              'item-card ' +
              (index === this.selectIndex ? 'item-card-select' : '')
            }
            onClick={() => {
              this.selectIndex = index
            }}
          >
            <Icon
              className='avatar'
              type='message'
              theme='twoTone'
              twoToneColor='#06afda'
            />
            <div className='item-text'>
              <span className='text-title'>{value.name}</span>
              <Badge className='item-badge' count={value.count} />
            </div>
            <span className='item-time'>{this.formatTime(value.lastTime)}</span>
          </div>
        </div>
      )
    )

    let messageContent = null

    if (this.selectIndex !== -1) {
      const contentData = this.messageData[this.selectIndex]
      messageContent = contentData.data.map(
        (value: IMessageContent, index: number) => {
          switch (value.type) {
            case 'notice':
              return (
                <div key={value.time.getTime()}>
                  <p className='notice-time'>{this.formatTime(value.time)}</p>
                  <div className='chat-notice'>
                    <p className='notice-title'>{value.title}</p>
                    <p>{value.content}</p>
                  </div>
                </div>
              )
            case 'message':
              return (
                <div key={value.time.getTime()} className='chat-item'>
                  <img src={AppAvatar} className='avatar' />
                  <div className='chat-content'>
                    <p className='item-time'>{this.formatTime(value.time)}</p>
                    <p className='item-text'>{value.content}</p>
                  </div>
                </div>
              )
            case 'message-me':
              return (
                <div
                  key={value.time.getTime()}
                  className='chat-item chat-item-me'
                >
                  <div className='chat-content'>
                    <p className='item-time'>{this.formatTime(value.time)}</p>
                    <p className='item-text'>{value.content}</p>
                  </div>
                  <img src={UserAvatar} className='avatar' />
                </div>
              )
            default:
              return null
          }
        }
      )
    }

    const contentBox =
      this.selectIndex !== -1 ? (
        <div className='message-box content-box'>
          <p className='text-title'>
            {this.selectIndex !== -1
              ? this.messageData[this.selectIndex].name
              : null}
            <span className='top-control'>
              <Tooltip placement='bottom' title='清空信息'>
                <Icon
                  className='control-icon'
                  type='delete'
                  theme='twoTone'
                  twoToneColor='#548589'
                />
              </Tooltip>
              <Tooltip placement='bottom' title='删除会话'>
                <Icon
                  className='control-icon'
                  type='close-circle'
                  theme='twoTone'
                  twoToneColor='#dc4e42'
                />
              </Tooltip>
            </span>
          </p>
          <Divider />

          <div className='chat-center'>{messageContent}</div>

          <Divider />
          <div className='bottom-box'>
            <Input className='chat-input' />
            <Button type='primary' shape='circle' icon='check' />
          </div>
        </div>
      ) : (
        <div className='nothing-box content-box'>
          <Icon type='mail' theme='twoTone' twoToneColor='#71cdd2' />
        </div>
      )

    return (
      <div className='message-main'>
        <div className='table-left'>
          <div className='message-list'>{messageList}</div>
        </div>
        <div className='table-right'>{contentBox}</div>
      </div>
    )
  }
}

export default Message