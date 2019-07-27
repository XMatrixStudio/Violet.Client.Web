import * as React from 'react'
// import { Form } from 'antd'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import UserService from 'src/Services/UserService'
import ServiceTool from 'src/Services/ServiceTool'
import RouterUtil from '../Util/RouterUtil'

interface ILoginFormProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
}

class NormalLoginForm extends React.Component<ILoginFormProps, any> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // {account: "zhenly", password: "123456", remember: true}
        UserService.Login(values.account, values.password, values.remember)
          .then(_ => {
            const params = RouterUtil.getParams(this.props.location.search)
            if (!params.valid) {
              window.location.href = '/user/info'
            } else {
              this.props.history.push(
                '/account/auth' + this.props.location.search
              )
            }
          })
          .catch(error => {
            ServiceTool.errorHandler(error, msg => {
              switch (msg) {
                case 'invalid_email':
                case 'invalid_phone':
                case 'invalid_name':
                case 'error_user_or_password':
                  message.error('用户名或密码错误')
                  break
                default:
                  message.error('发生错误:' + msg)
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
            rules: [{ required: true, message: '请输入用户名 / 手机 / 邮箱' }]
          })(
            <Input
              prefix={<Icon type='user' className='icon-color' />}
              placeholder='用户名 / 手机 / 邮箱'
            />
          )}
        </Form.Item>
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
        <Form.Item className='last-item'>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox style={{ float: 'left' }}>记住我</Checkbox>)}
          <Link style={{ float: 'right' }} to={'/account/reset' + this.props.location.search}>
            忘记密码
          </Link>
          <Button
            type='primary'
            htmlType='submit'
            className='login-btn'
            block={true}
          >
            登陆
          </Button>
          <Link style={{ display: 'block' }} to={'/account/register' + this.props.location.search}>
            现在注册
          </Link>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(withRouter(NormalLoginForm))
