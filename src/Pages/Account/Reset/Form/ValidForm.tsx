import * as React from 'react'
import { Form, Input, Icon, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import ValidCaptcha from '../../Components/ValidCaptcha'
import { useObserver } from 'mobx-react-lite'
import useValidForm from './../../Components/useValidForm'
import useRouter from 'use-react-router'

export interface IValidFormProps {
  form: WrappedFormUtils
}

function ValidForm(props: IValidFormProps) {
  const { getFieldDecorator } = props.form
  const { history } = useRouter()

  const { data, handleSubmit } = useValidForm(props.form)

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
        type='reset'
        error={data.codeError}
        defaultAccount={account => {
          data.defaultAccount = account
        }}
      />
      <Form.Item className='next-item'>
        <Button
          type='primary'
          onClick={() => {
            history.replace('/account/reset')
          }}
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
          下一步
        </Button>
      </Form.Item>
    </Form>
  ))
}

export default Form.create<IValidFormProps>()(ValidForm)
