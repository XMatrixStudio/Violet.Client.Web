import * as React from 'react'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { message } from 'antd'
import { useLocalStore } from 'mobx-react-lite'
import useRouter from 'use-react-router'

import UserService from '@/services/UserService'
import { errorHandler } from '@/components/core/UtilTool'

export interface IPasswordFormProps {
  form: WrappedFormUtils
}

export function usePasswordForm(props: IPasswordFormProps) {
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
    props.form.validateFields((err, values) => {
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
