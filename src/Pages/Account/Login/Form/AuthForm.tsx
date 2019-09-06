import React, { useEffect } from 'react'
import { useStore } from '@/Store'
import { useObserver, useLocalStore } from 'mobx-react-lite'
import { Skeleton, Checkbox, Select, Button, message } from 'antd'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import UserService from '@/services/UserService'
import { errorHandler, getAuthParams } from '@/components/UtilTool'
import useRouter from 'use-react-router'

export interface IAuthFormProps {
  form: WrappedFormUtils
}

export function useAuthForm(form: WrappedFormUtils) {
  const store = useStore()

  const { location } = useRouter()

  const data = useLocalStore(() => ({
    errorText: '',
    authScopes: ['base'],
    params: null as Type.AuthParams | null
  }))

  useEffect(() => {
    // 获取授权参数
    data.params = getAuthParams(location.search)
    if (data.params.valid) {
      data.params.scope.forEach(v => {
        if (['info', 'email'].includes(v) && !data.authScopes.includes(v)) {
          data.authScopes.push(v)
        }
      })
    } else {
      data.errorText = '无效参数'
    }
  }, [])

  const auth = () => {
    UserService.GetAuthByID(store.app!.id, data.params!.redirectUrl)
      .then(res => {
        // 已授权，直接跳转
        window.location.href =
          data.params!.redirectUrl +
          '?code=' +
          res.data.code +
          '&state=' +
          data.params!.state
      })
      .catch(error => {
        errorHandler(error, msg => {
          if (msg === 'error_redirect_url') {
            data.errorText = '非法回调地址'
          } else if (msg === 'not_exist_app') {
            data.errorText = '非法应用信息'
          } else if (msg !== 'not_exist_auth') {
            data.errorText = '获取授权信息失败, ' + msg
          }
        })
        // 未授权
      })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        UserService.Auth({
          appId: store.app!.id,
          duration: parseInt(values.authTime, 10),
          scope: values.authList
        })
          .then(auth)
          .catch(error => {
            errorHandler(error, msg => {
              message.error('授权失败, ' + msg)
            })
          })
      }
    })
  }

  return {
    data,
    store,
    handleSubmit
  }
}

export default Form.create()(AuthForm)
function AuthForm(props: IAuthFormProps) {
  const { data, store, handleSubmit } = useAuthForm(props.form)
  const { getFieldDecorator } = props.form
  return useObserver(() => {
    if (!store.app) {
      return <Skeleton />
    }
    if (data.errorText !== '') {
      return (
        <div className='auth-form'>
          <p className='error-title'>{data.errorText}</p>
        </div>
      )
    }
    return (
      <div className='auth-form'>
        <p className='auth-title'>
          您将授予 <strong>{store.app!.info.displayName}</strong> 以下权限：
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator('authList', {
              initialValue: data.authScopes
            })(
              <Checkbox.Group className='checkbox-group'>
                <Checkbox className='checkbox-btn' value='base' disabled={true}>
                  获取您的昵称、头像、性别
                </Checkbox>
                {data.authScopes.includes('info') && (
                  <Checkbox className='checkbox-btn' value='info'>
                    获取您的公开个人信息
                  </Checkbox>
                )}
                {data.authScopes.includes('email') && (
                  <Checkbox className='checkbox-btn' value='email'>
                    向您发送通知
                  </Checkbox>
                )}
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('authTime', {
              initialValue: '15'
            })(
              <Select>
                <Select.Option value='0'>仅单次授权</Select.Option>
                <Select.Option value='7'>7天内自动授权</Select.Option>
                <Select.Option value='15'>15天内自动授权</Select.Option>
                <Select.Option value='30'>30天内自动授权</Select.Option>
                <Select.Option value='90'>3个月内自动授权</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Button
            className='auth-btn'
            type='primary'
            size='large'
            htmlType='submit'
          >
            授权
          </Button>
        </Form>
      </div>
    )
  })
}
