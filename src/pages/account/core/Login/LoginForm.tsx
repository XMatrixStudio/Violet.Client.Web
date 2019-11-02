import React from 'react'

import {message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { useLocalStore } from 'mobx-react-lite'
import useRouter from 'use-react-router'
import { setError, errorHandler, getAuthParams } from '@/components/core/UtilTool'
import UserService from '@/services/UserService'
import { useStore } from '@/Store'

export interface ILoginFormProps {
  form: WrappedFormUtils
}

export function useLoginForm(props: ILoginFormProps) {
  const router = useRouter()
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
      console.log(values)
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
    handleReset
  }
}
