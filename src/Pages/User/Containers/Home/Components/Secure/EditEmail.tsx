import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import Input from 'antd/lib/input/Input'
import ValidCaptcha from 'src/Pages/Account/Components/Util/ValidCaptcha'
import { Button, message } from 'antd'
import UserService from 'src/Services/UserService'
import ServiceTool from 'src/Services/ServiceTool'

interface IEditEmailProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
  finish: (isEdit: boolean) => void
}

class EditEmail extends Component<IEditEmailProps, any> {
  componentDidMount() {
    document.title = '绑定邮箱 | Violet'
  }
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields(['account', 'captcha'], (err, values) => {
      if (!err) {
        UserService.UpdateAccount(values.account, values.captcha)
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
                default:
                  message.error('发生错误' + msg)
              }
            })
          })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='form-layout'>
        <div className='top-layout'>
          <div className='top-text'>
            <p className='title'>绑定邮箱</p>
            <p className='sub-title'>
              绑定邮箱可以帮助你找回密码以及接收重要通知
            </p>
          </div>
          {/* <div className='right-text'>
            上次修改密码: <strong>3个月前</strong>
          </div> */}
        </div>

        <Form className='my-form' onSubmit={this.handleSubmit}>
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
    )
  }
}

export default withRouter(Form.create()(EditEmail))
