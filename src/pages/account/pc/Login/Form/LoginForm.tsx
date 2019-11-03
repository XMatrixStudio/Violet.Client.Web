import React from 'react'

import { Form, Input, Icon, Checkbox, Button } from 'antd'
import { useObserver } from 'mobx-react-lite'
import { ILoginFormProps, useLoginForm } from '../../../core/Login/LoginForm'

export default Form.create()(LoginForm)

function LoginForm(props: ILoginFormProps) {
  const { data, handleSubmit, handleReset, form } = useLoginForm(props)

  return useObserver(() => (
    <Form onSubmit={handleSubmit} className='login-form'>
      <Form.Item>
        <p className='input-title'>用户名 / 手机 / 邮箱</p>
        {form.getFieldDecorator('account', {
          initialValue: data.id,
          rules: [{ required: true, message: '请输入用户名 / 手机 / 邮箱' }]
        })(<Input prefix={<Icon type='user' />} />)}
      </Form.Item>
      <Form.Item>
        <p className='input-title'>密码</p>
        {form.getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入你的密码' }]
        })(
          <Input
            prefix={<Icon type='key' />}
            type='password'
          />
        )}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator('remember', {
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
