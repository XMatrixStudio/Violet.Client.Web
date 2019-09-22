import React, { useRef } from 'react'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import UserService from '@/services/UserService'
import { message, Input } from 'antd'
import { useLocalStore } from 'mobx-react-lite'
import useRouter from 'use-react-router'
import { errorHandler, setError } from '@/components/core/UtilTool'

export interface IInfoFormProps {
  form: WrappedFormUtils
}

export function useInfoForm(form: WrappedFormUtils) {
  const router = useRouter()
  const nameInput = useRef<Input>(null)

  const data = useLocalStore(() => ({
    id: ''
  }))

  React.useEffect(() => {
    const state = router.location.state
    if (state && state.account) {
      data.id = state.account
    } else {
      // 返回上一步
      router.history.replace('/account/register' + router.location.search)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        // {userName: "zhenly", nickName: "ZhenlyChen", password: "123456", passwordAgain: "123456"}
        UserService.Register(values.userName, values.nickName, values.password)
          .then(_ => {
            // 跳转到完成页面
            router.history.push(
              '/account/register/finish' + router.location.search,
              { account: values.userName }
            )
          })
          .catch(error => {
            errorHandler(error, msg => {
              switch (msg) {
                case 'not_exist_email':
                  message.error('页面已过期，请返回上一步重新进行注册')
                  break
                case 'reserved_name':
                case 'exist_name':
                  setError(form, 'userName', '用户名已存在')
                  nameInput.current!.focus()
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
    router.history.replace('/account/register')
  }

  return {
    data,
    nameInput,
    handleSubmit,
    handleBack
  }
}

