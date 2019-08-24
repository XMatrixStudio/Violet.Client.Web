import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import ValidCaptcha from 'src/Components/ValidCaptcha'
import { Button, message, Input } from 'antd'
import UserService from 'src/Services/UserService'
import ServiceTool from 'src/Services/ServiceTool'
import UIStore from 'src/Store/UIStore'
import { inject, observer } from 'mobx-react'
import UserStore from 'src/Store/UserStore'

interface IEditEmailProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
  finish: (isEdit: boolean) => void
  UIStore?: UIStore
  UserStore?: UserStore
}

@inject('UIStore', 'UserStore')
@observer
class EditEmail extends Component<IEditEmailProps, any> {
  componentWillMount() {
    document.title = '绑定邮箱 | Violet'
    this.props.UIStore!.setTitle(
      '绑定邮箱',
      '绑定邮箱可以帮助你找回密码以及接收重要通知'
    )
    this.props.UIStore!.setBack('/user/secure')
  }
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields(
      ['account', 'captcha', 'password'],
      (err, values) => {
        if (!err) {
          UserService.UpdateAccount(
            values.account,
            values.captcha,
            values.password
          )
            .then(_ => {
              message.success('绑定成功')
              this.props.finish(true)
              this.props.history.goBack()
            })
            .catch(error => {
              ServiceTool.errorHandler(error, msg => {
                switch (msg) {
                  case 'error_code':
                  case 'not_exist_code':
                    message.error('验证码错误')
                    break
                  case 'timeout_code':
                    message.error('验证码已超时，请重新发送')
                    break
                  case 'error_password':
                    message.error('密码错误')
                    break
                  default:
                    message.error('发生错误' + msg)
                }
                this.props.form.resetFields(['captcha'])
                this.props.form.validateFields(['captcha'])
              })
            })
        }
      }
    )
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='form-layout'>
        <div className='base-card-box'>
          <Form className='my-form' onSubmit={this.handleSubmit}>
            <Form.Item className='hits-text'>
              当前邮箱:{' '}
              <strong>{this.props.UserStore!.data.email || '未绑定'}</strong>
            </Form.Item>
            <Form.Item label='绑定邮箱'>
              {getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: '请输入要绑定的邮箱'
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label='密码'>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码验证你的身份'
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <ValidCaptcha form={this.props.form} type='update' label={true} />
            <Button type='primary' htmlType='submit'>
              绑定邮箱
            </Button>
            <Button
              className='back-btn'
              onClick={() => {
                this.props.history.goBack()
              }}
            >
              取消
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(withRouter(EditEmail))
