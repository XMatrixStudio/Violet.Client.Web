import React, { Component } from 'react'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import { Input, Icon, Button, message } from 'antd'
import ValidCaptcha from 'src/Components/ValidCaptcha'
import UserService from 'src/Services/UserService'
import ServiceTool from 'src/Services/ServiceTool'
import AuthStore from 'src/Store/AuthStore'
import { inject, observer } from 'mobx-react'

interface IValidFormProps {
  form: WrappedFormUtils
  AuthStore?: AuthStore
  next: (id?: string) => void
}

@inject('AuthStore')
@observer
class ValidForm extends Component<IValidFormProps> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // this.props.next('test')
    this.props.form.validateFields(['account', 'captcha'], (err, values) => {
      if (!err) {
        // {account: "zhenlychen@foxmail.com", imageCaptcha: "1234", captcha: "11111"}
        UserService.Valid(values.account, values.captcha)
          .then(_ => {
            message.success('验证成功，请完善账号信息以完成注册')
            this.props.AuthStore!.resetRegisterValidTime()
            this.props.next(values.account)
          })
          .catch(error => {
            ServiceTool.errorHandler(error, msg => {
              switch (msg) {
                case 'invalid_code':
                case 'not_exist_code':
                case 'error_code':
                  message.error('验证码错误')
                  break
                case 'timeout_code':
                  message.error('验证码已过期，请重新获取')
                  break
                default:
                  message.error('发生错误：' + msg)
              }
            })
          })
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
        <ValidCaptcha form={this.props.form} type='register' />
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
