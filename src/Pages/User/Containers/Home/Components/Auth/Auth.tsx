import React, { Component } from 'react'
import './Auth.less'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import {
  Table,
  Button,
  Icon,
  Popconfirm,
  Modal,
  Tooltip,
  Form,
  Radio
} from 'antd'

import IcytownIcon from '@/Assets/icytown.png'
import dateFormat from 'dateformat'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import TextArea from 'antd/lib/input/TextArea'
import UserCard from '../Utils/UserCard'

@observer
class Auth extends Component<{ form: WrappedFormUtils }, any> {
  @observable selectedRowKeys: number[]
  @observable visibleReport: boolean

  columns = [
    {
      title: '应用',
      dataIndex: 'name',
      render: (text: any, record: any) => (
        <>
          <img className='app-icon' src={IcytownIcon} />
          <strong className='app-name'>{text}</strong>
          {/* <Popover
            placement='top'
            content={
              <div>
                <strong>XMatrix Studio 出品</strong>
              </div>
            }
          >
            <Icon
              className='ca-icon'
              type='safety-certificate'
              theme='twoTone'
              twoToneColor='#73c731'
            />
          </Popover> */}
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
              onClick={() => {
                this.props.form.resetFields()
                this.visibleReport = true
              }}
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
      permission: ['base', 'info', 'message'],
      authTime: new Date(new Date().getTime() - 1000000)
    },
    {
      key: 2,
      name: 'Coffee',
      own: 'ZhenlyChen',
      lastAuth: '昨天',
      permission: ['base', 'info'],
      authTime: new Date(new Date().getTime() - 1000000)
    }
  ]

  constructor(props: any) {
    super(props)
    this.selectedRowKeys = []
  }

  componentDidMount() {
    document.title = '授权管理 | Violet'
  }

  start = () => {
    Modal.confirm({
      title: '操作确认',
      content: '是否取消选中应用的授权',
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
        <Modal
          visible={this.visibleReport}
          okText='举报'
          title='举报应用'
          cancelText='取消'
          onOk={() => {
            this.props.form.validateFields((err, values) => {
              if (!err) {
                this.visibleReport = false
                console.log('Received values of form: ', values)
              }
            })
          }}
          onCancel={() => {
            this.visibleReport = false
          }}
        >
          <Form>
            <Form.Item label='举报原因'>
              {this.props.form.getFieldDecorator('reason')(
                <Radio.Group>
                  <Radio value='1'>诈骗</Radio>
                  <Radio value='2'>盗取信息</Radio>
                  <Radio value='3'>其他</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label='详情描述'>
              {this.props.form.getFieldDecorator('detail')(
                <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
              )}
            </Form.Item>
          </Form>
        </Modal>

        <div className='top-layout'>
          <div className='top-text'>
            <p className='title'>授权管理</p>
            <p className='sub-title'>管理你授权过的应用</p>
          </div>
          <div className='right-text'>
            已授权应用数: <strong>2</strong>
          </div>
        </div>
        <div className='auth-card base-card-box'>
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
                  <strong>开发方: </strong>
                  <UserCard info={{ name: record.own, level: 10 }} />
                </p>
                <p>
                  <strong>授权时间:</strong>{' '}
                  {dateFormat(record.authTime, 'yyyy/mm/dd h:MM:ss')}
                </p>
                <p>
                  <strong>有效时间:</strong> 14天
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

export default Form.create()(Auth)
