import * as React from 'react'
import { Form, Input, Icon, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { useObserver } from 'mobx-react-lite'
import ValidCaptcha from '../../Components/ValidCaptcha'
import useValidForm from '../../Components/useValidForm'

export interface IValidFormProps {
  form: WrappedFormUtils
}

function ValidForm(props: IValidFormProps) {
  const { getFieldDecorator } = props.form
  const { data, accountInput, setAccountError, handleSubmit } = useValidForm(
    props.form,
    'register'
  )

  return useObserver(() => (
    <Form onSubmit={handleSubmit} className='register-form'>
      <Form.Item>
        <p className='input-title'>电子邮箱 / 手机号码</p>
        {getFieldDecorator('account', {
          initialValue: data.defaultAccount,
          rules: [{ required: true, message: '请输入电子邮箱 / 手机号码' }]
        })(<Input ref={accountInput} prefix={<Icon type='user' />} />)}
      </Form.Item>
      <ValidCaptcha
        form={props.form}
        type='register'
        defaultAccount={account => {
          data.defaultAccount = account
        }}
        accountError={setAccountError}
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
