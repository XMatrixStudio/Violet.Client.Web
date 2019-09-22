import React from 'react'
import { useObserver } from 'mobx-react-lite'
import { Skeleton, Menu, Button, Icon, Dropdown } from 'antd'
import Form from 'antd/lib/form/Form'
import { UserCard } from '@/components/pc/UserCard'
import { useAuthForm } from '../../../core/Login/AuthForm'

export default Form.create()(AuthForm)
function AuthForm() {
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
          想要访问你的账户
          <strong>{store.user ? store.user!.info.nickname : '...'}</strong>
        </p>
        <Form onSubmit={handleSubmit}>
          <div className='checkbox-group'>
            <div className='auth-item auth-item-disable'>
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
