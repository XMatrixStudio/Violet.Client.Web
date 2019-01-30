import React, { Component } from 'react'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import { Input, Icon, Button, message } from 'antd'
import ValidCaptcha from '../../Util/ValidCaptcha'
import UserService from 'src/Services/UserService'

interface IValidFormProps {
  form: WrappedFormUtils
  next: (id?: string) => void
}

class ValidForm extends Component<IValidFormProps> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // {account: "zhenlychen@foxmail.com", imageCaptcha: "1234", captcha: "11111"}
        UserService.Valid(values.captcha, true).then(_ => {
          message.success('验证成功，请完善账号信息以完成注册')
          this.props.next(values.account)
        })
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: '请输入电子邮箱 / 手机号码' }]
          })(
            <Input
              prefix={<Icon type='user' className='icon-color' />}
              placeholder='电子邮箱 / 手机号码'
            />
          )}
        </Form.Item>
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
