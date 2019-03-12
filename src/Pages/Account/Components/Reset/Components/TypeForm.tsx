import React, { Component } from 'react'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import { Input, Icon, Button, Select, message } from 'antd'
const { Option } = Select

import TextArea from 'antd/lib/input/TextArea'
import ValidCaptcha from '../../Util/ValidCaptcha'
import NewPassword from '../../Util/NewPassword'
import UserService from 'src/Services/UserService'
import ServiceTool from 'src/Services/ServiceTool'

interface ITypeFormProps {
  form: WrappedFormUtils
  next: (id?: string) => void
  defaultType?: 'account'
}

class TypeForm extends Component<ITypeFormProps> {
  resetType = 'account'

  constructor(props: ITypeFormProps) {
    super(props)
    if (props.defaultType !== undefined) {
      this.resetType = props.defaultType
    }
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(this.props.form.getFieldValue('selectType'))
    switch (this.props.form.getFieldValue('selectType')) {
      case 'account': // 重置密码
        this.props.form.validateFields(
          ['account', 'captcha', 'password', 'confirm'],
          (err, values) => {
            if (!err) {
              // {account: "18823456789", captcha: "123456", password: "123qwe", confirm: "123qwe"}
              UserService.ResetPassword(
                values.account,
                values.captcha,
                values.password
              )
                .then(_ => {
                  this.props.next(values.account)
                })
                .catch(error => {
                  ServiceTool.errorHandler(error, msg => {
                    switch (msg) {
                      case 'error_code':
                        message.error('验证码错误')
                        this.props.form.resetFields(['captcha'])
                        break
                      case 'timeout_code':
                        message.error('验证码已过期，请重新发送')
                        this.props.form.resetFields(['captcha'])
                        break
                      default:
                        message.error('发生错误：' + msg)
                    }
                  })
                })
            }
          }
        )
        break
      case 'contact': // 申诉
        break
    }
  }

  handleTypeChange = (value: string) => {
    this.resetType = value
    this.props.form.resetFields()
    this.setState({})
  }

  SelectedForm = () => {
    const { getFieldDecorator } = this.props.form
    switch (this.resetType) {
      case 'account':
        return (
          <>
            <Form.Item>
              {getFieldDecorator('account', {
                rules: [{ required: true, message: '请输入邮箱地址或手机号码' }]
              })(
                <Input
                  prefix={<Icon type='mail' className='icon-color' />}
                  placeholder='邮箱地址/手机号'
                />
              )}
            </Form.Item>
            <ValidCaptcha form={this.props.form} isNew={false} />
            <NewPassword form={this.props.form} />
          </>
        )
      case 'contact':
        return (
          <>
            <Form.Item>
              {getFieldDecorator('userAccount', {
                rules: [{ required: true, message: '请输入联系邮箱' }]
              })(
                <Input
                  prefix={<Icon type='user' className='icon-color' />}
                  placeholder='联系邮箱'
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('userContact', {
                rules: [{ required: true, message: '请输入账号信息' }]
              })(
                <TextArea
                  rows={4}
                  placeholder='请描述你的账号信息，越详细申诉成功概率越高'
                />
              )}
            </Form.Item>
          </>
        )
      default:
        return null
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='normal-form'>
        <Form.Item>
          {getFieldDecorator('selectType', {
            initialValue: 'account'
          })(
            <Select onChange={this.handleTypeChange}>
              <Option value='account'>通过邮箱/手机号验证</Option>
              <Option value='contact'>联系客服</Option>
            </Select>
          )}
        </Form.Item>
        <this.SelectedForm />
        <Form.Item className='last-item'>
          <Button
            type='primary'
            htmlType='submit'
            className='reset-btn'
            block={true}
          >
            确定
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(TypeForm)
