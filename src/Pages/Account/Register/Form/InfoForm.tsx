import * as React from 'react'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import UserService from '../../../../services/UserService'
import ServiceTool from '../../../../services/ServiceTool'
import { message, Icon, Input, Button } from 'antd'
import NewPassword from '../../Components/NewPassword'
import { useObserver, useLocalStore } from 'mobx-react-lite'
import useRouter from 'use-react-router'

export interface IInfoFormProps {
  form: WrappedFormUtils
  next: () => void
}

function InfoForm(props: IInfoFormProps) {
  const { history, location } = useRouter()
  const data = useLocalStore(() => ({
    id: '',
    accountError: ''
  }))

  React.useEffect(() => {
    data.id = new URLSearchParams(location.search).get('id') || data.id
    if (data.id === '') {
      history.replace('/account/register')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        // {userName: "zhenly", nickName: "ZhenlyChen", password: "123456", passwordAgain: "123456"}
        UserService.Register(values.userName, values.nickName, values.password)
          .then(_ => {
            history.push('/account/register/finish' + location.search)
          })
          .catch(error => {
            ServiceTool.errorHandler(error, msg => {
              switch (msg) {
                case 'not_exist_email':
                  data.accountError = '用户邮箱未验证，无法完成注册'
                  break
                case 'reserved_name':
                case 'exist_name':
                  data.accountError = '用户名已存在'
                  break
                default:
                  message.error('发生错误：' + msg)
              }
            })
          })
      } else {
        if (err.userName) {
          data.accountError = '请输入用户名'
        }
      }
    })
  }

  const { getFieldDecorator } = props.form
  return useObserver(() => (
    <Form onSubmit={handleSubmit} className='register-form'>
      <Form.Item className='account-item'>
        <Icon className='account-icon' type='check' />
        <span>{data.id.includes('@') ? '你的邮箱：' : '你的手机：'}</span>
        <strong>{data.id}</strong>
      </Form.Item>
      <Form.Item
        validateStatus={data.accountError === '' ? 'success' : 'error'}
        help={data.accountError}
      >
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
        })(
          <Input
            prefix={<Icon type='user' />}
            onChange={() => {
              data.accountError = ''
            }}
          />
        )}
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
          onClick={() => {
            history.replace('/account/register')
          }}
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

export default Form.create<IInfoFormProps>()(InfoForm)
