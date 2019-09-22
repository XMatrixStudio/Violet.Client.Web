import React from 'react'
import './LoginSide.less'
import logo from '@/assets/images/logo.svg'
import { Icon, Tooltip } from 'antd'
import { useObserver } from 'mobx-react-lite'
import defaultAvatar from '@/assets/images/user.svg'
import { useLoginSide } from '../../core/Login/LoginSide'

export default function LoginSide() {
  const { store, handleRegister, handleLogout } = useLoginSide()
  return useObserver(() => {
    return (
      <div className='layout-side layout-login-side'>
        <div className='top-layout'>
          <img src={logo} className='logo' alt='logo' />
          <span className='violet'>Violet</span>
        </div>
        <div className='title'>
          {store.app === null ? (
            <>
              <p>登陆账号</p>
              <p className='sub-title'>Violet 用户中心</p>
            </>
          ) : (
            <>
              <p>授权登陆</p>
              <div className='banner'>
                {store.user ? (
                  <img
                    className='avatar'
                    src={store.user!.info.avatar}
                    alt='avatar'
                  />
                ) : (
                  <img className='avatar' src={defaultAvatar} alt='avatar' />
                )}

                <Icon
                  className='icon-check'
                  type='safety-certificate'
                  twoToneColor='#33a849'
                  theme='twoTone'
                />
                <img
                  className='avatar'
                  src={store.app!.info.avatar}
                  alt='avatar'
                />
              </div>
              <p className='sub-title'>
                <Tooltip title='访问主页' placement='bottom'>
                  <a
                    href={store.app!.info.url}
                    className='link'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {store.app!.info.displayName}
                  </a>
                </Tooltip>
              </p>
              <p className='des-title'>{store.app!.info.description}</p>
            </>
          )}
        </div>
        <div className='bottom-layout'>
          {store.user ? (
            <p className='help-text'>
              <span className='link' onClick={handleLogout}>
                切换账号
              </span>
            </p>
          ) : (
            <p className='help-text'>
              没有账号?
              <span className='link' onClick={handleRegister}>
                注册
              </span>
            </p>
          )}

          <p className='help-layout'>
            <Icon className='info-icon' type='info-circle' theme='filled' />
            Violet 需要通过手机或者邮箱识别你的身份
          </p>
        </div>
      </div>
    )
  })
}
