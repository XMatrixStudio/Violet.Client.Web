import React from 'react'

import { Form } from 'antd'
import { useObserver } from 'mobx-react-lite'
import { ILoginFormProps, useLoginForm } from '../../../core/Login/LoginForm'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  FormControlLabel,
  Checkbox
} from '@material-ui/core'

export default Form.create()(LoginForm)

function LoginForm(props: ILoginFormProps) {
  const { data, handleSubmit, handleReset } = useLoginForm(
    props
  )

  return useObserver(() => (
    <div className='login-layout'>
      {' '}
      <p className='app-title'>登陆</p>
      <form onSubmit={handleSubmit} className='login-form'>
        <FormControl className='login-item'>
          <InputLabel htmlFor='component-simple'>
            用户名 / 手机 / 邮箱
          </InputLabel>
          {props.form.getFieldDecorator('account', {
            initialValue: data.id,
            rules: [{ required: true, message: '请输入用户名 / 手机 / 邮箱' }]
          })(<Input />)}
        </FormControl>
        <FormControl className='login-item'>
          <InputLabel htmlFor='component-simple'>密码</InputLabel>
          {props.form.getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码' }]
          })(<Input type='password' />)}
        </FormControl>

        {props.form.getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true
        })(
          <FormControlLabel
            className='login-item'
            control={
              <Checkbox
                color='primary'
              />
            }
            label='记住我'
          />
        )}

        <span className='link' style={{ float: 'right' }} onClick={handleReset}>
          忘记密码
        </span>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size="large"
          className='login-btn'
        >
          登陆
        </Button>
      </form>
    </div>
  ))
}
