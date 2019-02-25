import React, { Component } from 'react'
import './Auth.less'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import {
  Table,
  Button,
  Card,
  Icon,
  Popconfirm,
  Popover,
  Tag,
  Modal,
  Tooltip
} from 'antd'

import IcytownIcon from '@/Assets/icytown.png'
import UserAvatar from '@/Assets/avatar.jpg'

@observer
class Auth extends Component {
  @observable selectedRowKeys: number[]

  columns = [
    {
      title: '应用',
      dataIndex: 'name',
      render: (text: any, recond: any) => (
        <>
          <img className='app-icon' src={IcytownIcon} />
          <strong className='app-name'>{text}</strong>
          <Popover
            placement='top'
            content={
              <div>
                Violet认证: <strong>XMatrix Studio 出品</strong>
              </div>
            }
          >
            <Icon
              className='ca-icon'
              type='safety-certificate'
              theme='twoTone'
              twoToneColor='#73c731'
            />
          </Popover>
        </>
      )
    },
    {
      title: '上次登陆',
      dataIndex: 'lastAuth'
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <>
          <Popconfirm
            title='该操作不可逆，是否取消授权？'
            okType='danger'
            okText='是'
            cancelText='否'
            onConfirm={() => {
              console.log('del')
            }}
          >
            <Tooltip placement='bottom' title='取消授权'>
              <Icon
                type='close-circle'
                className='control-icon'
                theme='twoTone'
                twoToneColor='#f9757a'
              />
            </Tooltip>
          </Popconfirm>
          <Tooltip placement='bottom' title='举报'>
            <Icon
              type='frown'
              theme='twoTone'
              className='control-icon'
              twoToneColor='#fcdc9b'
            />
          </Tooltip>
          <Tooltip placement='bottom' title='反馈'>
            <Icon
              type='notification'
              theme='twoTone'
              className='control-icon'
            />
          </Tooltip>
        </>
      )
    }
  ]

  data = [
    {
      key: 1,
      name: 'Icytown',
      own: 'MegaShow',
      lastAuth: '3周前',
      permission: ['base', 'info', 'message']
    },
    {
      key: 2,
      name: 'Coffee',
      own: 'ZhenlyChen',
      lastAuth: '昨天',
      permission: ['base', 'info']
    }
  ]

  constructor() {
    super({})
    this.selectedRowKeys = []
  }

  start = () => {
    Modal.confirm({
      title: '操作确认',
      content: '是否取消选中应用的授权，该操作不可逆',
      okText: '确认',
      okType: 'danger',
      cancelText: '放弃',
      centered: true,
      onOk: () => {
        this.selectedRowKeys = []
      }
    })
  }

  onSelectChange = (selectedRowKeys: number[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.selectedRowKeys = selectedRowKeys
  }

  render() {
    const rowSelection = {
      selectedRowKeys: this.selectedRowKeys,
      onChange: this.onSelectChange
    }
    const hasSelected = this.selectedRowKeys.length > 0
    return (
      <div className='auth-layout'>
        <div className='top-layout'>
          <div className='top-text'>
            <p className='title'>授权管理</p>
            <p className='sub-title'>管理你授权过的应用</p>
          </div>
          <div className='right-text'>
            已授权应用数: <strong>2</strong>
          </div>
        </div>
        <div className='auth-card'>
          <div>
            {hasSelected ? `已选择 ${this.selectedRowKeys.length} 个应用` : ''}
            <Button type='danger' onClick={this.start} disabled={!hasSelected}>
              取消授权
            </Button>
          </div>
          <Table
            className='auth-table'
            rowSelection={rowSelection}
            columns={this.columns}
            expandedRowRender={record => (
              <div>
                <p>
                  <strong>创建者: </strong>
                  <Popover
                    placement='rightTop'
                    content={
                      <div className='own-info'>
                        <img className='user-avatar' src={UserAvatar} />
                        <p className='user-name'>
                          {record.own}
                          <Icon type='man' className='gender-man gender-icon' />
                        </p>
                        <Tag className='user-tag' color='green'>
                          管理员
                        </Tag>
                        <p>地区: 广州</p>
                        <p>联系邮箱: zhenlychen@foxmail.com</p>
                        <p>联系电话: 18823456789</p>
                        <Button icon='message'>联系</Button>
                      </div>
                    }
                  >
                    <span className='own-name'>{record.own}</span>
                  </Popover>
                </p>
                <p>
                  <strong>授权时间:</strong> 2019/1/1 12:00:21
                </p>
                <p>
                  <strong>权限:</strong>
                </p>
                <ul>
                  <li>获取您的昵称、头像</li>
                  {record.permission.indexOf('info') === -1 ? null : (
                    <li>获取您的个人信息</li>
                  )}
                  {record.permission.indexOf('message') === -1 ? null : (
                    <li>向您发送通知</li>
                  )}
                </ul>
              </div>
            )}
            dataSource={this.data}
          />
        </div>
      </div>
    )
  }
}

export default Auth
