import { WrappedFormUtils } from 'antd/lib/form/Form'
import useRouter from 'use-react-router'
import UserService from '@/services/UserService'
import ServiceTool from '@/services/ServiceTool'
import { useLocalStore } from 'mobx-react-lite'
import { message } from 'antd'

export default function useValidForm(form: WrappedFormUtils) {
  const { history, location } = useRouter()

  const data = useLocalStore(() => ({
    defaultAccount: '',
    codeError: '',
    accountError: ''
  }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.validateFields(['account', 'captcha'], (err, values) => {
      if (!err) {
        // {account: "zhenlychen@foxmail.com", imageCaptcha: "1234", captcha: "11111"}
        UserService.Valid(values.account, values.captcha)
          .then(_ => {
            history.push('/account/register/finish' + location.search)
          })
          .catch(error => {
            ServiceTool.errorHandler(error, msg => {
              switch (msg) {
                case 'invalid_code':
                case 'not_exist_code':
                case 'error_code':
                  data.codeError = '验证码错误'
                  break
                case 'timeout_code':
                  data.codeError = '验证码已过期，请重新获取'
                  break
                default:
                  message.error('发生错误：' + msg)
              }
            })
          })
      } else {
        if (err.account) {
          data.accountError = err.account.errors[0].message
        }
        if (err.captcha) {
          data.codeError = err.captcha.errors[0].message
        }
      }
    })
  }

  return {
    data,
    handleSubmit
  }
}
