import React from 'react'
import './LoginSide.less'
import logo from '@/assets/images/logo.svg'
import { Icon } from 'antd'
import useRouter from 'use-react-router'
import { useObserver } from 'mobx-react-lite'
import { useStore } from '@/Store'
import defaultAvatar from '@/assets/images/user.svg'

export interface ILoginSideProps {}

export function useLoginSide() {
  const router = useRouter()
  const store = useStore()

  const handleRegister = () => {
    router.history.push('/account/register' + router.location.search)
  }

  return {
    store,
    handleRegister
  }
}

export default function LoginSide(props: ILoginSideProps) {
  const { store, handleRegister } = useLoginSide()
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
                  <img className='avatar' src={store.user!.info.avatar} />
                ) : (
                  <img className='avatar' src={defaultAvatar} />
                )}

                <Icon
                  className='icon-check'
                  type='safety-certificate'
                  twoToneColor='#33a849'
                  theme='twoTone'
                />
                <img src={store.app!.info.avatar} />
              </div>
              <p className='sub-title'>{store.app!.info.displayName}</p>
            </>
          )}
        </div>
        <div className='bottom-layout'>
          {store.user ? (
            <p className='help-text'>
              <span className='link' onClick={handleRegister}>
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
