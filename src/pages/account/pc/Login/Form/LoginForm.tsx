import React from 'react'

import { Form, Input, Icon, Checkbox, Button, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { useLocalStore, useObserver } from 'mobx-react-lite'
import useRouter from 'use-react-router'
import { setError, errorHandler, getAuthParams } from '@/components/UtilTool'
import UserService from '@/services/UserService'
import { useStore } from '@/Store'

export interface ILoginFormProps {
  form: WrappedFormUtils
}

export function useLoginForm(props: ILoginFormProps) {
  const router = useRouter()
  const inputPassword = React.useRef<Input>(null)
  const store = useStore()
  const { form } = props
  const data = useLocalStore(() => ({
    id: ''
  }))

  // 设置默认用户名
  React.useEffect(() => {
    const state = router.location.state
    if (state && state.account) {
      data.id = state.account
    }
  })

  // 提交事件
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        UserService.Login(values.account, values.password, values.remember)
          .then(_ => {
            const params = getAuthParams(router.location.search)
            if (!params.valid) {
              window.location.href = '/user/info'
            } else {
              UserService.fetchUserInfo(store)
              router.history.push('/account/auth' + router.location.search)
            }
          })
          .catch(error => {
            errorHandler(error, msg => {
              switch (msg) {
                case 'invalid_email':
                case 'invalid_phone':
                case 'invalid_name':
                case 'error_user_or_password':
                  setError(form, 'password', '用户名或密码错误，请重新输入', '')
                  inputPassword.current!.focus()
                  break
                default:
                  message.error('发生错误:' + msg)
              }
            })
          })
      }
    })
  }

  const handleReset = () => {
    router.history.push('/account/reset' + router.location.search)
  }

  return {
    data,
    handleSubmit,
    handleReset,
    inputPassword
  }
}

export default Form.create()(LoginForm)

function LoginForm(props: ILoginFormProps) {
  const { data, handleSubmit, handleReset, inputPassword } = useLoginForm(props)

  return useObserver(() => (
    <Form onSubmit={handleSubmit} className='login-form'>
      <Form.Item>
        <p className='input-title'>用户名 / 手机 / 邮箱</p>
        {props.form.getFieldDecorator('account', {
          initialValue: data.id,
          rules: [{ required: true, message: '请输入用户名 / 手机 / 邮箱' }]
        })(<Input prefix={<Icon type='user' />} />)}
      </Form.Item>
      <Form.Item>
        <p className='input-title'>密码</p>
        {props.form.getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入你的密码' }]
        })(
          <Input
            ref={inputPassword}
            prefix={<Icon type='key' />}
            type='password'
          />
        )}
      </Form.Item>
      <Form.Item>
        {props.form.getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true
        })(<Checkbox style={{ float: 'left' }}>记住我</Checkbox>)}
        <span className='link' style={{ float: 'right' }} onClick={handleReset}>
          忘记密码
        </span>
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
  ))
}
