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
}

function ValidForm(props: IValidFormProps) {
  const { getFieldDecorator } = props.form

  const data = useLocalStore(() => ({
    defaultAccount: ''
  }))

  React.useEffect(() => {})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    props.form.validateFields(['account', 'captcha'], (err, values) => {
      if (!err) {
        // {account: "zhenlychen@foxmail.com", imageCaptcha: "1234", captcha: "11111"}
        UserService.Valid(values.account, values.captcha)
          .then(_ => {
            message.success('验证成功，请完善账号信息以完成注册')
            // TODO
          })
          .catch(error => {
            ServiceTool.errorHandler(error, msg => {
              switch (msg) {
                case 'invalid_code':
                case 'not_exist_code':
                case 'error_code':
                  message.error('验证码错误')
                  break
                case 'timeout_code':
                  message.error('验证码已过期，请重新获取')
                  break
                default:
                  message.error('发生错误：' + msg)
              }
            })
          })
      }
    })
  }

  return useObserver(() => (
    <Form onSubmit={handleSubmit} className='register-form'>
      <Form.Item>
        <p className='input-title'>电子邮箱 / 手机号码</p>
        {getFieldDecorator('account', {
          initialValue: data.defaultAccount,
          rules: [{ required: true, message: '请输入电子邮箱 / 手机号码' }]
        })(<Input prefix={<Icon type='user' className='icon-color' />} />)}
      </Form.Item>
      <ValidCaptcha
        form={props.form}
        type='register'
        defaultAccount={account => {
          data.defaultAccount = account
        }}
      />
      <Form.Item className='last-item'>
        <Button
          type='primary'
          htmlType='submit'
          className='register-btn'
          size='large'
        >
          确定
        </Button>
      </Form.Item>
    </Form>
  ))
}

export default Form.create()(ValidForm)
