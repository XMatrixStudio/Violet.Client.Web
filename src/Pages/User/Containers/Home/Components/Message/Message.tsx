import React, { Component } from 'react'
import './Message.less'
import { Card, Icon, Badge, Divider, Input, Button, Tooltip } from 'antd'
import AppAvatar from '@/Assets/icytown.png'
import UserAvatar from '@/Assets/avatar.jpg'

class Message extends Component {
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
        <div className='message-main'>
          <div className='table-left'>
            <div className='message-list'>
              <div className='item-card'>
                <Icon
                  className='avatar'
                  type='message'
                  theme='twoTone'
                  twoToneColor='#6adcda'
                />
                <div className='item-text'>
                  <span className='text-title'>系统通知</span>
                  <Badge className='item-badge' count={3} />
                </div>
                <span className='item-time'>6小时前</span>
              </div>
              <div className='item-card item-card-select'>
                <img src={AppAvatar} className='avatar' />
                <div className='item-text'>
                  <span className='text-title'>Icytown</span>
                  <Badge className='item-badge' count={2} />
                </div>
                <span className='item-time'>12小时前</span>
              </div>
              <div className='item-card'>
                <img src={UserAvatar} className='avatar' />
                <div className='item-text'>
                  <span className='text-title'>ZhenlyChen</span>
                  <Badge className='item-badge' count={2} />
                </div>
                <span className='item-time'>3天前</span>
              </div>
            </div>
          </div>
          <div className='table-right'>
            <div className='message-box'>
              <p className='text-title'>
                Icytown{' '}
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
              <div className='chat-center'>
                <p className='notice-time'>前天 12:11</p>
                <div className='chat-notice'>
                  <p className='notice-title'>通知</p>
                  <p>在座的各位都是辣鸡</p>
                </div>
                <div className='chat-item'>
                  <img src={AppAvatar} className='avatar' />
                  <div className='chat-content'>
                    <p className='item-time'>昨天 20:12</p>
                    <p className='item-text'>你好菜</p>
                  </div>
                </div>
                <div className='chat-item'>
                  <img src={AppAvatar} className='avatar' />
                  <div className='chat-content'>
                    <p className='item-time'>昨天 20:14</p>
                    <p className='item-text'>我好强</p>
                  </div>
                </div>
                <div className='chat-item chat-item-me'>
                  <div className='chat-content'>
                    <p className='item-time'>昨天 20:14</p>
                    <p className='item-text'>我哭鸟</p>
                  </div>
                  <img src={UserAvatar} className='avatar' />
                </div>
              </div>
              <Divider />
              <div className='bottom-box'>
                <Input className='chat-input' />
                <Button type='primary' shape='circle' icon='check' />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Message
