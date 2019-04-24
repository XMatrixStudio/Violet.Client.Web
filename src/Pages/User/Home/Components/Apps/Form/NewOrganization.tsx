import React, { Component } from 'react'
import './NewOrganization.less'
import { Form, Input, Button, Tooltip, Icon, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import AvatarSelect from '../../Common/AvatarSelect'
import AddImage from '@/Assets/add.png'
import { inject, observer } from 'mobx-react'
import UserStore from 'src/Store/UserStore'
import { observable } from 'mobx'

interface INewOrganizationProps {
  form: WrappedFormUtils
  UserStore?: UserStore
}

@inject('UserStore')
@observer
class NewOrganization extends Component<INewOrganizationProps> {
  @observable selectIcon?: string
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.selectIcon === undefined) {
          message.error('请选择组织图标')
        } else {
          console.log(values)
        }
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
                imageURL={AddImage}
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
