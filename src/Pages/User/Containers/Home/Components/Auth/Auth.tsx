import React, { Component } from 'react'
import './Auth.less'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import {
  Table,
  Button,
  Card,
  Icon,
  Tooltip,
  Popconfirm,
  Popover,
  Tag,
  Modal
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
          {text}
        </>
      )
    },
    {
      title: '上次登陆',
      dataIndex: 'lastAuth'
    },
    {
      title: '取消授权',
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
            <Icon className='control-icon' type='close' />
          </Popconfirm>
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
            <p>
              已授权应用：<strong>6</strong>
            </p>
          </div>
        </div>
        <Card hoverable={true} className='auth-control'>
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
                  创建者:
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
                      </div>
                    }
                  >
                    {record.own}
                  </Popover>
                </p>
                <p>权限: </p>
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
        </Card>
      </div>
    )
  }
}

export default Auth
