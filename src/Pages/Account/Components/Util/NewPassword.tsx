import React, { Component } from 'react'
import { Icon, Input } from 'antd'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'

interface INewPasswordProps {
  form: WrappedFormUtils
}

class NewPassword extends Component<INewPasswordProps> {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码' }]
          })(
            <Input
              prefix={<Icon type='key' className='icon-color' />}
              type='password'
              placeholder='密码'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('passwordAgain', {
            rules: [{ required: true, message: '请再次输入你的密码' }]
          })(
            <Input
              prefix={<Icon type='key' className='icon-color' />}
              type='password'
              placeholder='再次输入密码'
            />
          )}
        </Form.Item>
      </>
    )
  }
}

export default NewPassword
