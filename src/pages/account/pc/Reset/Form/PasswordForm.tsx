import React from 'react'
import { Button, Form, Icon } from 'antd'
import { useObserver } from 'mobx-react-lite'
import NewPassword from '../../Components/NewPassword'
import {
  IPasswordFormProps,
  usePasswordForm
} from '../../../core/Reset/PasswordForm'

function PasswordForm(props: IPasswordFormProps) {
  const { data, handleSubmit, handleBack } = usePasswordForm(props)

  return useObserver(() => (
    <Form onSubmit={handleSubmit} className='reset-form'>
      <Form.Item className='account-item'>
        <Icon className='account-icon' type='check' />
        <span>给</span>
        <strong>{data.id}</strong>
        <span>设置一个新密码吧</span>
      </Form.Item>
      <NewPassword form={props.form} />
      <Form.Item className='next-item'>
        <Button
          type='primary'
          onClick={handleBack}
          className='last-btn'
          size='large'
          ghost={true}
        >
          上一步
        </Button>
        <Button
          type='primary'
          htmlType='submit'
          className='next-btn'
          size='large'
        >
          设置新密码
        </Button>
      </Form.Item>
    </Form>
  ))
}

export default Form.create<IPasswordFormProps>()(PasswordForm)
