import React from 'react'
import Form from 'antd/lib/form/Form'
import {  Icon, Input, Button } from 'antd'
import NewPassword from '../../Components/NewPassword'
import { useObserver } from 'mobx-react-lite'
import {IInfoFormProps, useInfoForm} from '../../../core/Register/InfoForm'

function InfoForm(props: IInfoFormProps) {
  const { data, nameInput, handleSubmit, handleBack } = useInfoForm(props.form)
  const { getFieldDecorator } = props.form

  return useObserver(() => (
    <Form onSubmit={handleSubmit} className='register-form'>
      <Form.Item className='account-item'>
        <Icon className='account-icon' type='check' />
        <span>{data.id.includes('@') ? '你的邮箱：' : '你的手机：'}</span>
        <strong>{data.id}</strong>
      </Form.Item>
      <Form.Item>
        <p className='input-title'>唯一用户名</p>
        {getFieldDecorator('userName', {
          rules: [
            { required: true, message: '请输入用户名' },
            {
              pattern: /^[a-zA-Z0-9_-]*$/,
              message: '用户名由字母、数字、下划线或横杠组成'
            },
            { pattern: /^[a-zA-Z].*$/, message: '用户名必须由字母开头' },
            { min: 3, message: '用户名不能小于3个字符' },
            { max: 24, message: '用户名不能大于24个字符' }
          ]
        })(<Input ref={nameInput} prefix={<Icon type='user' />} />)}
      </Form.Item>
      <Form.Item>
        <p className='input-title'>昵称</p>
        {getFieldDecorator('nickName', {
          rules: [
            { required: true, message: '请输入昵称' },
            { max: 24, message: '昵称不能大于24个字符' }
          ]
        })(<Input prefix={<Icon type='robot' />} />)}
      </Form.Item>
      <NewPassword form={props.form} />
      <Form.Item className='next-item'>
        <Button
          type='primary'
          onClick={handleBack}
          className='last-btn'
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

export default Form.create()(InfoForm)
