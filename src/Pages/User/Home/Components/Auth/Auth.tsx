import React, { Component } from 'react'
import './Auth.less'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import {
  Table,
  Button,
  Icon,
  Popconfirm,
  Modal,
  Tooltip,
  Form,
  Radio,
  message
} from 'antd'

import IcytownIcon from '@/Assets/icytown.png'
import dateFormat from 'dateformat'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import TextArea from 'antd/lib/input/TextArea'
import UIStore from 'src/Store/UIStore'
import UserService from 'src/Services/UserService'
import ServiceTool from 'src/Services/ServiceTool'

interface IAuthProps {
  form: WrappedFormUtils
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class Auth extends Component<IAuthProps> {
  @observable selectedRowKeys: number[]
  @observable visibleReport: boolean
  @observable data: Type.UserAuthData[] = []

  columns = [
    {
      title: '应用',
      dataIndex: 'appDisplayName',
      render: (text: string, record: Type.UserAuthData) => (
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
      dataIndex: 'time',
      render: (text: string) => <span>{this.getTimeText(new Date(text))}</span>
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: Type.UserAuthData) => (
        <>
          <Popconfirm
            title='该操作不可逆，是否取消授权？'
            okType='danger'
            okText='是'
            cancelText='否'
            onConfirm={() => {
              this.removeAuth(record.appId, true)
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

  constructor(props: any) {
    super(props)
    this.selectedRowKeys = []
  }

  componentWillMount() {
    document.title = '授权管理 | Violet'
    this.props.UIStore!.setTitle('授权管理', '当前2个应用可以访问你的信息')
    this.getAuthList()
  }

  @action
  getAuthList = () => {
    UserService.GetAuths(1, 10).then(res => {
      this.data = res.data.data
      console.log(this.data)
    })
  }

  getTimeText = (time: Date) => {
    // n 小时前
    const dur = Math.floor(
      (new Date().getTime() - time.getTime()) / (1000 * 60 * 60)
    )
    if (dur < 1) {
      return '刚刚'
    } else if (dur < 24) {
      return dur + '小时前'
    } else if (dur < 24 * 30) {
      return Math.floor(dur / 24) + '天前'
    } else if (dur < 24 * 30 * 30) {
      return Math.floor(dur / (24 * 30)) + '个月前'
    } else {
      return Math.floor(dur / (24 * 30 * 30)) + '年前'
    }
  }

  removeAuth = async (id: string, refresh = false) => {
    try {
      await UserService.RemoveAuth(id)
      if (refresh) {
        message.success('删除成功')
        this.getAuthList()
      }
      return true
    } catch (error) {
      ServiceTool.errorHandler(error, msg => {
        message.error('删除失败,' + msg)
        this.getAuthList()
      })
      return false
    }
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
        const selected = this.selectedRowKeys
        this.selectedRowKeys = []
        let successCount = 0
        selected.forEach(async v => {
          if (await this.removeAuth(this.data[v].appId, false)) {
            successCount++
            if (successCount === selected.length) {
              this.getAuthList()
              message.success('已删除' + selected.length + '个应用的授权')
            }
          }
        })
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
        <div className='auth-card base-card-box'>
          <div>
            <span className='auth-title'>已授权应用</span>
            {hasSelected ? `已选择 ${this.selectedRowKeys.length} 个应用` : ''}
            <Button type='danger' onClick={this.start} disabled={!hasSelected}>
              取消授权
            </Button>
          </div>
          <Table
            className='auth-table'
            rowSelection={rowSelection}
            columns={this.columns}
            expandedRowRender={(record: Type.UserAuthData) => (
              <div>
                {/* <p>
                  <strong>开发方: </strong>
                  <UserCard name={record.own} />
                </p> */}
                <p>
                  <strong>授权时间:</strong>{' '}
                  {dateFormat(record.time, 'yyyy/mm/dd hh:MM:ss')}
                </p>
                <p>
                  <strong>有效时间:</strong>
                  {record.duration === 0 ? '单次' : record.duration + '天'}
                </p>
                <p>
                  <strong>权限:</strong>
                </p>
                <ul>
                  <li>获取您的昵称、头像</li>
                  {!record.scope.includes('info') ? null : (
                    <li>获取您的个人信息</li>
                  )}
                  {!record.scope.includes('message') ? null : (
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
