import React, { Component } from 'react'
import './Message.less'
import { Icon, Badge, Divider, Input, Button, Tooltip } from 'antd'
import AppAvatar from '@/Assets/icytown.png'
import UserAvatar from '@/Assets/avatar.jpg'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

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

  constructor() {
    super({})
    this.selectIndex = -1
    this.messageData = [
      {
        avatar: '',
        lastTime: new Date(new Date().getTime() - 8434521),
        count: 3,
        name: '系统通知',
        data: [
          {
            time: new Date(new Date().getTime() - 1232234),
            type: 'notice',
            title: '辣鸡通知',
            content: '在座的各位都是辣鸡'
          },
          {
            time: new Date(new Date().getTime() - 1431234),
            type: 'notice',
            title: '咸鸡通知',
            content: '在座的各位都是秀秀'
          },
          {
            time: new Date(new Date().getTime() - 532234),
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
            time: new Date(new Date().getTime() - 12234),
            type: 'message-me',
            content: '你好奇'
          },
          {
            time: new Date(new Date().getTime() - 332234),
            type: 'notice',
            title: '辣鸡通知',
            content: '在座的各位都是辣鸡'
          },
          {
            time: new Date(new Date().getTime() - 231234),
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
        return date.getHours() + ':' + date.getMinutes()
      } else if (diffDay === 1) {
        return '昨天' + date.getHours() + ':' + date.getMinutes()
      } else if (diffDay === 2) {
        return '前天' + date.getHours() + ':' + date.getMinutes()
      } else {
        return (
          date.getMonth() +
          1 +
          '/' +
          date.getDay() +
          date.getHours() +
          ':' +
          date.getMinutes()
        )
      }
    } else {
      return (
        date.getFullYear() +
        ' ' +
        date.getMonth() +
        '/' +
        date.getDay() +
        date.getHours() +
        ':' +
        date.getMinutes()
      )
    }
  }

  onClickListItem = (index: number) => () => {
    this.selectIndex = index
  }

  render() {
    const messageList = this.messageData.map(
      (value: IMessageData, index: number) => (
        <>
          <div
            className={
              'item-card ' +
              (index === this.selectIndex ? 'item-card-select' : '')
            }
            onClick={this.onClickListItem(index)}
          >
            <Icon
              className='avatar'
              type='message'
              theme='twoTone'
              twoToneColor='#6adcda'
            />
            <div className='item-text'>
              <span className='text-title'>{value.name}</span>
              <Badge className='item-badge' count={value.count} />
            </div>
            <span className='item-time'>{this.formatTime(value.lastTime)}</span>
          </div>
        </>
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
                <>
                  <p className='notice-time'>{this.formatTime(value.time)}</p>
                  <div className='chat-notice'>
                    <p className='notice-title'>{value.title}</p>
                    <p>{value.content}</p>
                  </div>
                </>
              )
            case 'message':
              return (
                <div className='chat-item'>
                  <img src={AppAvatar} className='avatar' />
                  <div className='chat-content'>
                    <p className='item-time'>{this.formatTime(value.time)}</p>
                    <p className='item-text'>{value.content}</p>
                  </div>
                </div>
              )
            case 'message-me':
              return (
                <div className='chat-item chat-item-me'>
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
        <div className='message-box'>
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
        <div className='nothing-box'>
          <Icon type='mail' theme='twoTone' twoToneColor='#71cdd2' />
        </div>
      )

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
        <div className='message-main'>
          <div className='table-left'>
            <div className='message-list'>{messageList}</div>
          </div>
          <div className='table-right'>{contentBox}</div>
        </div>
      </div>
    )
  }
}

export default Message
