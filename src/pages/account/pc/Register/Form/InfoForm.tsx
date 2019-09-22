import React, { useRef } from 'react'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import UserService from '@/services/UserService'
import { message, Icon, Input, Button } from 'antd'
import NewPassword from '../../Components/NewPassword'
import { useObserver, useLocalStore } from 'mobx-react-lite'
import useRouter from 'use-react-router'
import { errorHandler, setError } from '@/components/UtilTool'

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
