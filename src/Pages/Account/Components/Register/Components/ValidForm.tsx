import React, { Component } from 'react'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import { Input, Icon, Button } from 'antd'
import ImageCaptcha from '../../Util/ImageCaptcha'
import ValidCaptcha from '../../Util/ValidCaptcha'

interface IValidFormProps {
  form: WrappedFormUtils
  next: (id?: string) => void
}

class ValidForm extends Component<IValidFormProps> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.next('a@zhenly.cn')
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('userAccount', {
            rules: [{ required: true, message: '请输入电子邮箱 / 手机号码' }]
          })(
            <Input
              prefix={<Icon type='user' className='icon-color' />}
              placeholder='电子邮箱 / 手机号码'
            />
          )}
        </Form.Item>
        <ImageCaptcha form={this.props.form} />
        <ValidCaptcha form={this.props.form} />
        <Form.Item className='last-item'>
          <Button
            type='primary'
            htmlType='submit'
            className='register-btn'
            block={true}
          >
            确定
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(ValidForm)
