import React, { Component } from 'react'
import { Icon, Input } from 'antd'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'

interface INewPasswordProps {
  form: WrappedFormUtils
}

class NewPassword extends Component<INewPasswordProps> {
  state = {
    confirmDirty: false
  }

  handleConfirmBlur = (e: any) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (_: any, value: any, callback: any) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致')
    } else {
      callback()
    }
  }

  validateToNextPassword = (_: any, value: any, callback: any) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入你的密码' },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(
            <Input
              prefix={<Icon type='key' className='icon-color' />}
              type='password'
              placeholder='密码'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: '请再次输入你的密码' },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(
            <Input
              prefix={<Icon type='key' className='icon-color' />}
              type='password'
              placeholder='再次输入密码'
              onBlur={this.handleConfirmBlur}
            />
          )}
        </Form.Item>
      </>
    )
  }
}

export default NewPassword
