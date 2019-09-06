/***
 * 登陆主界面
 */
import * as React from 'react'
import './LoginMain.less'
import { Form, Input, Icon, Checkbox, Button, message } from 'antd'
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form'
import UserService from '@/services/UserService'
import { useLocalStore, useObserver } from 'mobx-react-lite'
import useRouter from 'use-react-router'
import { getQuery, setError, errorHandler } from '@/components/UtilTool'

export interface ILoginMainProps extends FormComponentProps<ILoginFormValues> {}

interface ILoginFormValues {
  account: string
  password: string
  remember: boolean
}

export function useLoginMain(form: WrappedFormUtils<ILoginFormValues>) {
  const router = useRouter()
  const inputPassword = React.useRef<Input>(null)
  const data = useLocalStore(() => ({
    id: ''
  }))

  // 设置默认用户名
  React.useEffect(() => {
    const state = router.location.state
    if (state && state.account) {
      data.id = state.account
    }
  })

  // 提交事件
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        UserService.Login(values.account, values.password, values.remember)
          .then(_ => {
            window.location.href = '/user/info'
            // TODO 授权登陆
            // const params = RouterUtil.getParams(this.props.location.search);
            // if (!params.valid) {
            //   window.location.href = "/user/info"
            // } else {
            //   this.props.history.push(
            //     "/account/auth" + this.props.location.search
            //   )
            // }
          })
          .catch(error => {
            errorHandler(error, msg => {
              switch (msg) {
                case 'invalid_email':
                case 'invalid_phone':
                case 'invalid_name':
                case 'error_user_or_password':
                  setError(form, 'password', '用户名或密码错误，请重新输入', '')
                  inputPassword.current!.focus()
                  break
                default:
                  message.error('发生错误:' + msg)
              }
            })
          })
      }
    })
  }

  const handleReset = () => {
    router.history.push('/account/reset' + router.location.search)
  }

  return {
    data,
    handleSubmit,
    handleReset,
    inputPassword
  }
}

function LoginMain(props: ILoginMainProps) {
  const { data, handleSubmit, handleReset, inputPassword } = useLoginMain(
    props.form
  )

  return useObserver(() => (
    <div className='layout-login-main'>
      <Form onSubmit={handleSubmit} className='login-form'>
        <Form.Item>
          <p className='input-title'>用户名 / 手机 / 邮箱</p>
          {props.form.getFieldDecorator('account', {
            initialValue: data.id,
            rules: [{ required: true, message: '请输入用户名 / 手机 / 邮箱' }]
          })(<Input prefix={<Icon type='user' />} />)}
        </Form.Item>
        <Form.Item>
          <p className='input-title'>密码</p>
          {props.form.getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码' }]
          })(
            <Input
              ref={inputPassword}
              prefix={<Icon type='key' />}
              type='password'
            />
          )}
        </Form.Item>
        <Form.Item>
          {props.form.getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox style={{ float: 'left' }}>记住我</Checkbox>)}
          <a style={{ float: 'right' }} onClick={handleReset}>
            忘记密码
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-btn'
            size='large'
          >
            登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  ))
}

export default Form.create<ILoginMainProps>()(LoginMain)
