import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import ValidCaptcha from 'src/Components/ValidCaptcha'
import { Button, message, Input } from 'antd'
import UserService from 'src/Services/UserService'
import ServiceTool from 'src/Services/ServiceTool'
import { Link } from 'react-router-dom'
import UserStore from 'src/Store/UserStore'
import { inject, observer } from 'mobx-react'
import UIStore from 'src/Store/UIStore'

interface IEditPhoneProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
  finish: (isEdit: boolean) => void
  UserStore?: UserStore
  UIStore?: UIStore
}

@inject('UserStore', 'UIStore')
@observer
class EditPhone extends Component<IEditPhoneProps, any> {
  componentWillMount() {
    document.title = '绑定手机号 | Violet'
    this.props.UIStore!.setTitle(
      <>
        <Link key='link' to='/user/secure'>
          账户安全
        </Link>
        <span key='more'> - 绑定手机号</span>
      </>,
      '绑定手机号可以帮助你通过短信找回密码'
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
                  case 'not_exist_code':
                  case 'error_code':
                    message.error('验证码错误, 请重新发送')
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
        <Form className='my-form' onSubmit={this.handleSubmit}>
          <Form.Item className='hits-text'>
            当前手机号:{' '}
            <strong>{this.props.UserStore!.data.phone || '未绑定'}</strong>
          </Form.Item>
          <Form.Item label='绑定手机号'>
            {getFieldDecorator('account', {
              rules: [
                {
                  required: true,
                  message: '请输入要绑定的手机号'
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
            绑定手机号
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
    )
  }
}

export default withRouter(Form.create()(EditPhone))
