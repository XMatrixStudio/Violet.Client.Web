import React, { Component } from 'react'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import { Input, Icon, Button, Select } from 'antd'
const { Option, OptGroup } = Select

import TextArea from 'antd/lib/input/TextArea'
import ImageCaptcha from '../../Util/ImageCaptcha'
import ValidCaptcha from '../../Util/ValidCaptcha'
import NewPassword from '../../Util/NewPassword'

interface ITypeFormProps {
  form: WrappedFormUtils
  next: (id?: string) => void
  defaultType?: 'email'
}

class TypeForm extends Component<ITypeFormProps> {
  resetType = 'email'

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
    switch (this.resetType) {
      case 'email':
        return (
          <>
            <Form.Item>
              {getFieldDecorator('userAccount', {
                rules: [{ required: true, message: '请输入完整的邮箱地址' }]
              })(
                <Input
                  prefix={<Icon type='mail' className='icon-color' />}
                  placeholder='完整的邮箱地址'
                />
              )}
            </Form.Item>
            <ValidCaptcha form={this.props.form} />
            <NewPassword form={this.props.form} />
          </>
        )
      case 'phone':
        return (
          <>
            <Form.Item>
              {getFieldDecorator('userAccount', {
                rules: [{ required: true, message: '请输入完整的手机号码' }]
              })(
                <Input
                  prefix={<Icon type='mobile' className='icon-color' />}
                  placeholder='完整的手机号码'
                />
              )}
            </Form.Item>
            <ImageCaptcha form={this.props.form} />
            <ValidCaptcha form={this.props.form} />
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
            initialValue: 'email'
          })(
            <Select onChange={this.handleTypeChange}>
              <OptGroup label='身份验证'>
                <Option value='email'>通过邮箱5*****@qq.com验证</Option>
                <Option value='phone'>通过手机138*******1验证</Option>
              </OptGroup>
              <OptGroup label='申诉'>
                <Option value='contact'>联系客服</Option>
              </OptGroup>
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
