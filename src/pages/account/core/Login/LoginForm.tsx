import React from 'react'

import { message } from 'antd'
import { useLocalStore } from 'mobx-react-lite'
import useRouter from 'use-react-router'
import {
  errorHandler,
  getAuthParams,
  setFieldError
} from '@/components/core/UtilTool'
import UserService from '@/services/UserService'
import { useStore } from '@/Store'

import useForm from '@/components/core/FormHook'

export interface ILoginFormProps {}

export function useLoginForm(props: ILoginFormProps) {
  const router = useRouter()
  const store = useStore()
  const form = useForm<{
    account: string
    password: string
    remember: boolean
  }>()
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
    form.validateFields().then(values => {
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
                setFieldError(
                  form,
                  'password',
                  '用户名或密码错误，请重新输入',
                  ''
                )
                break
              default:
                message.error('发生错误:' + msg)
            }
          })
        })
    })
  }

  const handleReset = () => {
    router.history.push(
      (router.location.pathname.indexOf('/account-m') !== -1
        ? '/account-m'
        : '/account') +
        '/reset' +
        router.location.search
    )
  }

  const handleRegister = () => {
    router.history.push(
      (router.location.pathname.indexOf('/account-m') !== -1
        ? '/account-m'
        : '/account') +
        '/register' +
        router.location.search
    )
  }

  return {
    data,
    handleSubmit,
    handleReset,
    handleRegister,
    form
  }
}
