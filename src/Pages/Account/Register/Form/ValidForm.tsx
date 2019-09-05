/***
 * 验证码模块
 */
import * as React from 'react'
import { Form, Input, Icon, Button, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import UserService from '../../../../services/UserService'
import ServiceTool from '../../../../services/ServiceTool'
import ValidCaptcha from '../../Components/ValidCaptcha'
import { useLocalStore, useObserver } from 'mobx-react-lite'

export interface IValidFormProps {
  form: WrappedFormUtils
  next: (id: string) => void
}

function ValidForm(props: IValidFormProps) {
  const { getFieldDecorator } = props.form

  const data = useLocalStore(() => ({
    defaultAccount: '',
    codeError: '',
    accountError: ''
  }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    props.form.validateFields(['account', 'captcha'], (err, values) => {
      if (!err) {
        // {account: "zhenlychen@foxmail.com", imageCaptcha: "1234", captcha: "11111"}
        UserService.Valid(values.account, values.captcha)
          .then(_ => {
            props.next(values.account)
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
          data.accountError = '请输入邮箱/手机号'
        }
        if (err.captcha) {
          data.codeError = '请输入正确的验证码'
        }
      }
    })
  }

  return useObserver(() => (
    <Form onSubmit={handleSubmit} className='register-form'>
      <Form.Item
        validateStatus={data.accountError === '' ? 'success' : 'error'}
        help={data.accountError}
      >
        <p className='input-title'>电子邮箱 / 手机号码</p>
        {getFieldDecorator('account', {
          initialValue: data.defaultAccount,
          rules: [{ required: true, message: '请输入电子邮箱 / 手机号码' }]
        })(
          <Input
            prefix={<Icon type='user' className='icon-color' />}
            onChange={() => {
              data.accountError = ''
            }}
          />
        )}
      </Form.Item>
      <ValidCaptcha
        accountError={error => {
          data.accountError = error
        }}
        form={props.form}
        type='register'
        error={data.codeError}
        defaultAccount={account => {
          data.defaultAccount = account
        }}
      />
      <Form.Item className='next-item'>
        <Button
          type='primary'
          htmlType='submit'
          className='next-btn'
          size='large'
        >
          下一步
        </Button>
      </Form.Item>
    </Form>
  ))
}

export default Form.create<IValidFormProps>()(ValidForm)
