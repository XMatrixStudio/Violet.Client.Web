import { WrappedFormUtils } from 'antd/lib/form/Form'
import useRouter from 'use-react-router'
import UserService from '@/services/UserService'
import { useLocalStore } from 'mobx-react-lite'
import { message, Input } from 'antd'
import { errorHandler, setError } from '@/components/UtilTool'
import { useRef } from 'react'

export default function useValidForm(
  form: WrappedFormUtils,
  type: 'register' | 'reset'
) {
  const { history, location } = useRouter()
  const accountInput = useRef<Input>(null)

  const data = useLocalStore(() => ({
    defaultAccount: ''
  }))

  const setAccountError = (err: string) => {
    setError(form, 'account', err)
    accountInput.current!.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.validateFields(['account', 'captcha'], (err, values) => {
      if (!err) {
        UserService.Valid(values.account, values.captcha)
          .then(_ => {
            if (type === 'register') {
              history.push('/account/register/info' + location.search, {
                account: values.account
              })
            } else if (type === 'reset') {
              history.push('/account/reset/password' + location.search, {
                account: values.account
              })
            }
          })
          .catch(error => {
            errorHandler(error, msg => {
              switch (msg) {
                case 'invalid_code':
                case 'not_exist_code':
                case 'error_code':
                  setError(form, 'captcha', '验证码错误')
                  break
                case 'timeout_code':
                  setError(form, 'captcha', '验证码已过期，请重新获取')
                  break
                default:
                  message.error('发生错误：' + msg)
              }
            })
          })
      }
    })
  }

  const handleBackReset = () => {
    history.replace('/account/reset' + location.search)
  }

  return {
    data,
    accountInput,
    setAccountError,
    handleSubmit,
    handleBackReset
  }
}
