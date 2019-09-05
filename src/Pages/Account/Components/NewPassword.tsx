/***
 * 密码填充表单
 */
import * as React from 'react'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import { Input, Icon } from 'antd'
import { useLocalStore, useObserver } from 'mobx-react-lite'

export interface INewPasswordProps {
  form: WrappedFormUtils
}

export default function NewPassword(props: INewPasswordProps) {
  const data = useLocalStore(() => ({
    confirmDirty: false
  }))

  const handleConfirmBlur = (e: any) => {
    const value = e.target.value
    data.confirmDirty = data.confirmDirty || !!value
  }

  const compareToFirstPassword = (_: any, value: any, callback: any) => {
    if (value && value !== props.form.getFieldValue('password')) {
      callback('两次输入密码不一致')
    } else {
      callback()
    }
  }

  const validateToNextPassword = (_: any, value: any, callback: any) => {
    if (!/^[a-zA-Z].*[0-9]|.*[0-9].*[a-zA-Z]/.test(value)) {
      callback('密码不能为纯数字或纯字母')
    } else if (value && data.confirmDirty) {
      props.form.validateFields(['confirm'], { force: true })
      callback()
    } else {
      callback()
    }
  }

  const { getFieldDecorator } = props.form
  return useObserver(() => (
    <div>
      <Form.Item>
        <p className='input-title'>密码</p>
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: '请输入你的密码' },
            { min: 6, message: '密码不能小于6位' },
            { max: 512, message: '密码不能大于512位' },
            {
              validator: validateToNextPassword
            }
          ]
        })(
          <Input.Password prefix={<Icon type='key' className='icon-color' />} />
        )}
      </Form.Item>
      <Form.Item>
        <p className='input-title'>再次输入密码</p>
        {getFieldDecorator('confirm', {
          rules: [
            { required: true, message: '请再次输入你的密码' },
            {
              validator: compareToFirstPassword
            }
          ]
        })(
          <Input.Password
            prefix={<Icon type='key' className='icon-color' />}
            onBlur={handleConfirmBlur}
          />
        )}
      </Form.Item>
    </div>
  ))
}
