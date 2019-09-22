/***
 * 密码填充表单
 */
import * as React from 'react'
import Form from 'antd/lib/form/Form'
import { Input, Icon } from 'antd'
import { useObserver } from 'mobx-react-lite'
import {
  INewPasswordProps,
  useNewPassword
} from '../../core/Components/NewPassword'

export default function NewPassword(props: INewPasswordProps) {
  const {
    getFieldDecorator,
    handleConfirmBlur,
    compareToFirstPassword,
    validateToNextPassword
  } = useNewPassword(props)

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
