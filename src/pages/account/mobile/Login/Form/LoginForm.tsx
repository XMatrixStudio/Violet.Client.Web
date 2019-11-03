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
  Checkbox,
  FormHelperText
} from '@material-ui/core'

export default Form.create()(LoginForm)

function LoginForm(props: ILoginFormProps) {
  const { data, handleSubmit, handleReset, form } = useLoginForm(props)

  return useObserver(() => (
    <div className='login-layout'>
      <p className='app-title'>登陆</p>
      <form onSubmit={handleSubmit} className='login-form'>
        <FormControl fullWidth={true} className='login-item'>
          <InputLabel htmlFor='component-simple'>
            用户名 / 手机 / 邮箱
          </InputLabel>
          {form.getFieldDecorator('account', {
            initialValue: data.id,
            rules: [{ required: true, message: '请输入用户名 / 手机 / 邮箱' }]
          })(<Input />)}
        </FormControl>
        <FormControl fullWidth={true} className='login-item'>
          <InputLabel htmlFor='component-simple'>密码</InputLabel>
          {form.getFieldDecorator('password', {
            initialValue: '',
            rules: [{ required: true, message: '请输入你的密码' }]
          })(<Input type='password' />)}
          {form.errors.password && (
            <FormHelperText>
              {form.errors.password[0].message}
            </FormHelperText>
          )}
        </FormControl>

        {form.getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true
        })(
          <FormControlLabel
            className='login-item login-checkbox'
            control={<Checkbox color='primary' />}
            label='记住我'
          />
        )}

        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          className='login-btn'
        >
          登陆
        </Button>
        <Button color='primary' className='login-btn' onClick={handleReset}>
          忘记密码
        </Button>
      </form>
    </div>
  ))
}
