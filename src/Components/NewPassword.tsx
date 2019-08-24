import React, { Component } from 'react'
import { Icon, Input } from 'antd'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'

interface INewPasswordProps {
  form: WrappedFormUtils
  label?: boolean
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
    if (!/^[a-zA-Z].*[0-9]|.*[0-9].*[a-zA-Z]/.test(value)) {
      callback('密码不能为纯数字或纯字母')
    } else if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
      callback()
    } else {
      callback()
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <>
        <Form.Item label={this.props.label === true ? '密码' : null}>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入你的密码' },
              { min: 6, message: '密码不能小于6位' },
              { max: 512, message: '密码不能大于512位' },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(
            <Input.Password
              prefix={
                this.props.label === true ? null : (
                  <Icon type='key' className='icon-color' />
                )
              }
              placeholder={this.props.label === true ? '' : '密码'}
            />
          )}
        </Form.Item>
        <Form.Item label={this.props.label === true ? '再次输入密码' : null}>
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: '请再次输入你的密码' },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(
            <Input.Password
              prefix={
                this.props.label === true ? null : (
                  <Icon type='key' className='icon-color' />
                )
              }
              placeholder={this.props.label === true ? '' : '再次输入密码'}
              onBlur={this.handleConfirmBlur}
            />
          )}
        </Form.Item>
      </>
    )
  }
}

export default NewPassword
