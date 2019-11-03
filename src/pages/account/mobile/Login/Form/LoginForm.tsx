import React from 'react'

import { Form } from 'antd'
import { useObserver } from 'mobx-react-lite'
import { ILoginFormProps, useLoginForm } from '../../../core/Login/LoginForm'
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
  Switch,
  FormControlLabel
} from '@material-ui/core'

export default Form.create()(LoginForm)

function LoginForm(props: ILoginFormProps) {
  const { data, handleSubmit, handleReset, form } = useLoginForm(props)

  return useObserver(() => (
    <div className='login-layout'>
      <p className='app-title'>登陆</p>
      <form onSubmit={handleSubmit} className='login-form'>
        <FormControl
          fullWidth={true}
          className='login-item'
          error={form.errors.account !== undefined}
        >
          <InputLabel>用户名 / 手机 / 邮箱</InputLabel>
          {form.getFieldDecorator('account', {
            initialValue: data.id,
            rules: [{ required: true, message: '请输入用户名 / 手机 / 邮箱' }]
          })(<Input />)}
          {form.errors.account && (
            <FormHelperText>{form.errors.account[0].message}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth={true}
          className='login-item'
          error={form.errors.password !== undefined}
        >
          <InputLabel>密码</InputLabel>
          {form.getFieldDecorator('password', {
            initialValue: '',
            rules: [{ required: true, message: '请输入你的密码' }]
          })(<Input type='password' />)}
          {form.errors.password && (
            <FormHelperText>{form.errors.password[0].message}</FormHelperText>
          )}
        </FormControl>

          <FormControlLabel
            control={
              <Switch
                color='primary'
                onChange={e => {
                  form.setFieldsValue({
                    remember: e.target.checked
                  })
                }}
                {...form.getFieldDecorator('remember', {
                  initialValue: false
                })}
              />
            }
            label='记住我'
          />

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
