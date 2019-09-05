import * as React from 'react'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { message, Button, Form, Icon } from 'antd'
import { useObserver, useLocalStore } from 'mobx-react-lite'
import useRouter from 'use-react-router'

import UserService from '@/services/UserService'
import ServiceTool from '@/services/ServiceTool'
import NewPassword from '../../Components/NewPassword'

export interface IPasswordFormProps {
  form: WrappedFormUtils
}

function PasswordForm(props: IPasswordFormProps) {
  const { history, location } = useRouter()
  const data = useLocalStore(() => ({
    id: '',
    accountError: ''
  }))

  React.useEffect(() => {
    data.id = new URLSearchParams(location.search).get('id') || data.id
    if (data.id === '') {
      history.replace('/account/reset/valid')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO 重新密码请求
    props.form.validateFields((err, values) => {
      if (!err) {
        UserService.ResetPassword(data.id, '', values.password)
          .then(_ => {
            history.push('/account/reset/finish' + location.search)
          })
          .catch(error => {
            ServiceTool.errorHandler(error, msg => {
              switch (msg) {
                case 'not_exist_email':
                case 'reserved_name':
                case 'exist_name':
                  data.accountError = msg
                  break
                default:
                  message.error('发生错误：' + msg)
              }
            })
          })
      } else {
        if (err.userName) {
          data.accountError = '请输入用户名'
        }
      }
    })
  }

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
          onClick={() => {
            history.replace('/account/reset/valid')
          }}
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
