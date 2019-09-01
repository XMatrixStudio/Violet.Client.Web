/***
 * 登陆主界面
 */
import * as React from 'react'
import './LoginMain.less'
import { Form, Input, Icon, Checkbox, Button, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { Link } from 'react-router-dom'
import useReactRouter from 'use-react-router'
import UserService from '../../../services/UserService'
import ServiceTool from '../../../services/ServiceTool'
import { useLocalStore, useObserver } from 'mobx-react-lite'

export interface ILoginMainProps {
  form: WrappedFormUtils
}

function LoginMain(props: ILoginMainProps) {
  const { getFieldDecorator } = props.form
  const { location } = useReactRouter()
  const inputPassword = React.useRef<Input>(null)

  const localStore = useLocalStore(() => ({
    passwordError: false
  }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        // {account: "zhenly", password: "123456", remember: true}
        UserService.Login(values.account, values.password, values.remember)
          .then(_ => {
            window.location.href = '/user/info'
            // const params = RouterUtil.getParams(this.props.location.search);
            // if (!params.valid) {
            //   window.location.href = "/user/info"
            // } else {
            //   this.props.history.push(
            //     "/account/auth" + this.props.location.search
            //   )
            // }
          })
          .catch(error => {
            ServiceTool.errorHandler(error, msg => {
              switch (msg) {
                case 'invalid_email':
                case 'invalid_phone':
                case 'invalid_name':
                case 'error_user_or_password':
                  localStore.passwordError = true
                  props.form.resetFields(['password'])
                  inputPassword.current!.focus();
                  break
                default:
                  message.error('发生错误:' + msg)
              }
            })
          })
      }
    })
  }

  return useObserver(() => (
    <div className='layout-login-main'>
      <Form onSubmit={handleSubmit} className='login-form'>
        <Form.Item>
          <p className='input-title'>用户名 / 手机 / 邮箱</p>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: '请输入用户名 / 手机 / 邮箱' }]
          })(<Input prefix={<Icon type='user' className='icon-color' />} />)}
        </Form.Item>
        <Form.Item
          validateStatus={localStore.passwordError ? 'error' : 'success'}
          help={localStore.passwordError ? '用户名或密码错误，请重新输入' : ''}
        >
          <p className='input-title'>密码</p>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码' }]
          })(
            <Input
              ref={inputPassword}
              onChange={() => {
                localStore.passwordError = false
              }}
              prefix={<Icon type='key' className='icon-color' />}
              type='password'
            />
          )}
        </Form.Item>
        <Form.Item className='last-item'>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox style={{ float: 'left' }}>记住我</Checkbox>)}
          <Link
            style={{ float: 'right' }}
            to={'/account/reset' + location.search}
          >
            忘记密码
          </Link>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-btn'
            size='large'
          >
            登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  ))
}

export default Form.create()(LoginMain)
