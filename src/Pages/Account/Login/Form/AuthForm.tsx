import React, { useEffect } from 'react'
import { useStore } from '@/Store'
import { useObserver, useLocalStore } from 'mobx-react-lite'
import { Skeleton, Menu, Button, message, Icon, Dropdown } from 'antd'
import Form from 'antd/lib/form/Form'
import UserService from '@/services/UserService'
import { errorHandler, getAuthParams } from '@/components/UtilTool'
import useRouter from 'use-react-router'
import { Type } from '@/services/type'
import { UserCard } from '@/components/UserCard/UserCard'

export interface IAuthFormProps {}

export function useAuthForm() {
  const store = useStore()

  const { location } = useRouter()

  const data = useLocalStore(() => ({
    errorText: '',
    authScopes: ['base'],
    selected: { base: true } as { [key: string]: boolean },
    authTime: 15,
    params: null as Type.AuthParams | null
  }))

  useEffect(() => {
    // 获取授权参数
    data.params = getAuthParams(location.search)
    if (data.params && data.params.valid) {
      data.params.scope.forEach(v => {
        if (['info', 'email'].includes(v) && !data.authScopes.includes(v)) {
          data.authScopes.push(v)
          data.selected[v] = true
        }
      })
    } else {
      data.errorText = '无效参数'
    }
    // eslint-disable-next-line
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
    const selectScope = []
    for (const s in data.selected) {
      if (data.selected[s] === true) {
        selectScope.push(s)
      }
    }
    UserService.Auth({
      appId: store.app!.id,
      duration: data.authTime,
      scope: selectScope
    })
      .then(auth)
      .catch(error => {
        errorHandler(error, msg => {
          message.error('授权失败, ' + msg)
        })
      })
  }

  const handleSelect = (key: string) => {
    return () => {
      data.selected[key] = !data.selected[key]
    }
  }

  const handleTime = (time: number) => {
    return () => {
      data.authTime = time
    }
  }

  return {
    data,
    store,
    handleSubmit,
    handleSelect,
    handleTime
  }
}

export default Form.create()(AuthForm)
function AuthForm(props: IAuthFormProps) {
  const { data, store, handleSubmit, handleSelect, handleTime } = useAuthForm()

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

    const menu = (
      <Menu>
        <Menu.Item onClick={handleTime(0)}>仅单次授权</Menu.Item>
        <Menu.Item onClick={handleTime(7)}>7天内自动授权</Menu.Item>
        <Menu.Item onClick={handleTime(15)}>15天内自动授权</Menu.Item>
        <Menu.Item onClick={handleTime(30)}>30天内自动授权</Menu.Item>
        <Menu.Item onClick={handleTime(90)}>3个月内自动授权</Menu.Item>
      </Menu>
    )

    const menuText = (time: number) => {
      switch (time) {
        case 7:
          return '7天内自动授权'
        case 15:
          return '15天内自动授权'
        case 30:
          return '30天内自动授权'
        case 90:
          return '3个月内自动授权'
        default:
          return '仅单次授权'
      }
    }

    return (
      <div className='auth-form'>
        <p className='auth-title'>
          <strong>{store.app!.info.displayName}</strong> by
          <span className='developer-name'>
            {store.app!.owner.type === 'user' && (
              <UserCard id={store.app!.owner.id} />
            )}
          </span>
        </p>
        <p className='sub-title'>
          想要访问你的账户<strong>{store.user ? store.user!.info.nickname: '...'}</strong>
        </p>
        <Form onSubmit={handleSubmit}>
          <div className='checkbox-group'>
            <div
              className='auth-item auth-item-disable'
            >
              <div className='auth-item-icon'>
                <Icon type='user' />
              </div>
              <div className='auth-item-content'>
                <p className='item-title'>访问你的基本信息</p>
                <p className='item-text'>账号标识、昵称、头像、性别</p>
              </div>
              <div className='auth-checkbox'>
                <Icon
                  type='check-circle'
                  theme='twoTone'
                  twoToneColor='#8a6bbe'
                />
              </div>
            </div>

            {data.authScopes.includes('info') && (
              <div
                className={
                  'auth-item ' +
                  (data.selected.info
                    ? 'auth-item-select'
                    : 'auth-item-unselect')
                }
                onClick={handleSelect('info')}
              >
                <div className='auth-item-icon'>
                  <Icon type='idcard' />
                </div>
                <div className='auth-item-content'>
                  <p className='item-title'>访问你的公开个人信息</p>
                  <p className='item-text'>公开的邮箱、联系方式等个人信息</p>
                </div>
                <div className='auth-checkbox'>
                  {data.selected.info ? (
                    <Icon
                      type='check-circle'
                      theme='twoTone'
                      twoToneColor='#8a6bbe'
                    />
                  ) : (
                    <Icon type='stop' theme='twoTone' twoToneColor='#d2d2e0' />
                  )}
                </div>
              </div>
            )}
            {data.authScopes.includes('email') && (
              <div
                className={
                  'auth-item ' +
                  (data.selected.email
                    ? 'auth-item-select'
                    : 'auth-item-unselect')
                }
                onClick={handleSelect('email')}
              >
                <div className='auth-item-icon'>
                  <Icon type='mail' />
                </div>
                <div className='auth-item-content'>
                  <p className='item-title'>向你发送通知</p>
                  <p className='item-text'>通过邮件等渠道向你发送通知</p>
                </div>
                <div className='auth-checkbox'>
                  {data.selected.email ? (
                    <Icon
                      type='check-circle'
                      theme='twoTone'
                      twoToneColor='#8a6bbe'
                    />
                  ) : (
                    <Icon type='stop' theme='twoTone' twoToneColor='#d2d2e0' />
                  )}
                </div>
              </div>
            )}
          </div>
          <Button
            className='auth-btn'
            type='primary'
            size='large'
            htmlType='submit'
          >
            授权
          </Button>
          <Dropdown className='auth-time' overlay={menu}>
            <span className='link'>
              {menuText(data.authTime)} <Icon type='down' />
            </span>
          </Dropdown>
        </Form>
      </div>
    )
  })
}
