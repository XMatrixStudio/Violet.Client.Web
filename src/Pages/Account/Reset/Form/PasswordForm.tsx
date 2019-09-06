import * as React from 'react'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { message, Button, Form, Icon } from 'antd'
import { useObserver, useLocalStore } from 'mobx-react-lite'
import useRouter from 'use-react-router'

import UserService from '@/services/UserService'
import NewPassword from '../../Components/NewPassword'
import { errorHandler } from '@/components/UtilTool'

export interface IPasswordFormProps {
  form: WrappedFormUtils
}

export function usePasswordForm(form: WrappedFormUtils) {
  const { history, location } = useRouter()
  const data = useLocalStore(() => ({
    id: ''
  }))

  React.useEffect(() => {
    const state = location.state
    if (state && state.account) {
      data.id = state.account
    } else {
      // 返回上一步
      history.replace('/account/reset/valid' + location.search)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO 重新密码请求
    form.validateFields((err, values) => {
      if (!err) {
        UserService.ResetPassword(values.password)
          .then(_ => {
            history.push('/account/reset/finish' + location.search, {
              account: data.id
            })
          })
          .catch(error => {
            errorHandler(error, msg => {
              switch (msg) {
                case 'not_exist_email':
                case 'reserved_name':
                case 'exist_name':
                  break
                default:
                  message.error('发生错误：' + msg)
              }
            })
          })
      }
    })
  }

  const handleBack = () => {
    history.replace('/account/reset/valid' + location.search)
  }

  return {
    data,
    handleSubmit,
    handleBack
  }
}

function PasswordForm(props: IPasswordFormProps) {
  const { data, handleSubmit, handleBack } = usePasswordForm(props.form)

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
