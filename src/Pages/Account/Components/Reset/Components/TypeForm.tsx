import React, { Component } from 'react'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import { Input, Icon, Button, Select } from 'antd'
const { Option } = Select

import TextArea from 'antd/lib/input/TextArea'
import ValidCaptcha from '../../Util/ValidCaptcha'
import NewPassword from '../../Util/NewPassword'

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
    this.props.next('a@zhenly.cn')
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  handleTypeChange = (value: string) => {
    this.resetType = value
    this.props.form.resetFields()
    this.setState({})
  }

  SelectedForm = () => {
    const { getFieldDecorator } = this.props.form
    console.log(this.resetType)
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
