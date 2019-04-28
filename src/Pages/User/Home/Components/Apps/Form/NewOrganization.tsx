import React, { Component } from 'react'
import './NewOrganization.less'
import { Form, Input, Button, Tooltip, Icon, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import AvatarSelect from '../../Common/AvatarSelect'
import AddImage from '@/Assets/add.png'
import { inject, observer } from 'mobx-react'
import UserStore from 'src/Store/UserStore'
import { observable } from 'mobx'
import DevService from 'src/Services/DevService'
import ServiceTool from 'src/Services/ServiceTool'

interface INewOrganizationProps {
  form: WrappedFormUtils
  UserStore?: UserStore
  next: (refresh: boolean) => void
}

@inject('UserStore')
@observer
class NewOrganization extends Component<INewOrganizationProps> {
  @observable selectIcon?: string
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.selectIcon && this.selectIcon.length > 102400) {
          message.error('组织图标过大')
          return
        }
        const finish = message.loading('组织信息上传中...')
        DevService.newOrg({
          avatar: this.selectIcon,
          description: values.orgDescription,
          displayName: values.orgDisplayName,
          name: values.orgName,
          contact: values.developerName,
          email: values.developerEmail,
          phone: values.developerPhone
        })
          .then(_ => {
            finish()
            message.success('创建组织成功')
            this.props.UserStore!.updateInfo()
            this.props.next(true)
          })
          .catch(error => {
            finish()
            ServiceTool.errorHandler(error, msg => {
              // exist_name - 组织已存在
              // limit_orgs - 组织数量达到上限
              // reserved_name - 用户 / 组织保留
              switch (msg) {
                case 'exist_name':
                case 'reserved_name':
                  message.error('应用名已存在')
                  break
                case 'limit_orgs':
                  message.error('当前用户组织数量已达上限')
                  break
                default:
                  message.error('发生错误' + msg)
              }
            })
          })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const devInfo = this.props.UserStore!.state.info.dev
    if (!devInfo) {
      return null
    }
    return (
      <div className='new-org'>
        <div className='base-card-box'>
          <div className='org-help'>
            组织可以帮助你协作管理应用, 你还可以创建{' '}
            <span>{devInfo.org.limit! - devInfo.org.own}</span> 个组织
          </div>
          <Form className='my-form' onSubmit={this.handleSubmit}>
            <Form.Item
              className='item-app-icon'
              label={
                <span>
                  组织图标
                  <Tooltip title='组织图标将会在授权时候展示'>
                    <Icon
                      className='tip-icon'
                      type='question-circle'
                      theme='twoTone'
                      twoToneColor='#b3b3b3'
                    />
                  </Tooltip>
                </span>
              }
            >
              <AvatarSelect
                imageURL={this.selectIcon || AddImage}
                setImage={file => {
                  this.selectIcon = file
                }}
                title='点击或拖动选择组织图标'
              />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  组织名
                  <Tooltip title='组织名是组织的唯一标识, 请慎重选择'>
                    <Icon
                      className='tip-icon'
                      type='question-circle'
                      theme='twoTone'
                      twoToneColor='#b3b3b3'
                    />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('orgName', {
                rules: [
                  {
                    required: true,
                    message: '请输入组织名'
                  },
                  {
                    pattern: /^[a-zA-Z]+/,
                    message: '组织名由字母开头'
                  },
                  {
                    pattern: /^[a-zA-Z0-9_-]*$/,
                    message: '组织名由大小写字母, 数字, 下划线和横线组成'
                  },
                  {
                    max: 32,
                    message: '组织名长度不能超过32位'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  组织显示名称
                  <Tooltip title='展示名将会在授权时候展示'>
                    <Icon
                      className='tip-icon'
                      type='question-circle'
                      theme='twoTone'
                      twoToneColor='#b3b3b3'
                    />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('orgDisplayName', {
                rules: [
                  {
                    required: true,
                    message: '请输入组织显示名称'
                  },
                  {
                    max: 32,
                    message: '组织显示名长度不能超过32位'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  组织描述
                  <Tooltip title='展示名将会在授权时候展示'>
                    <Icon
                      className='tip-icon'
                      type='question-circle'
                      theme='twoTone'
                      twoToneColor='#b3b3b3'
                    />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('orgDescription', {
                rules: [
                  {
                    required: true,
                    message: '请输入组织描述'
                  },
                  {
                    max: 128,
                    message: '组织描述长度不能超过128位'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  组织联系人
                  <Tooltip title='该信息仅供系统内部联系'>
                    <Icon
                      className='tip-icon'
                      type='question-circle'
                      theme='twoTone'
                      twoToneColor='#b3b3b3'
                    />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('developerName', {
                rules: [
                  {
                    required: true,
                    message: '请输入联系人'
                  },
                  {
                    max: 32,
                    message: '联系人长度不能超过32位'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  联系邮箱
                  <Tooltip title='该信息仅供系统内部联系'>
                    <Icon
                      className='tip-icon'
                      type='question-circle'
                      theme='twoTone'
                      twoToneColor='#b3b3b3'
                    />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('developerEmail', {
                rules: [
                  {
                    required: true,
                    message: '请输入联系邮箱'
                  },
                  {
                    type: 'email',
                    message: '请输入合法的邮箱'
                  },
                  {
                    max: 128,
                    message: '邮箱长度不能超过128位'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  联系电话
                  <Tooltip title='该信息仅供系统内部联系'>
                    <Icon
                      className='tip-icon'
                      type='question-circle'
                      theme='twoTone'
                      twoToneColor='#b3b3b3'
                    />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('developerPhone', {
                rules: [
                  {
                    required: true,
                    message: '请输入联系电话'
                  },
                  {
                    max: 32,
                    message: '联系电话长度不能超过32位'
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Button type='primary' htmlType='submit'>
              创建组织
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(NewOrganization)
