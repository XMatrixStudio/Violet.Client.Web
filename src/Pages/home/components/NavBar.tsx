import './NavBar.less'
import logo from '@/assets/logo.svg'

import React, { useEffect } from 'react';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import { Button, Tooltip } from 'antd';
import { useStore } from '../../../Store';

export interface INavBarProps {
}

export default function NavBar(props: INavBarProps) {
  const store = useStore()

  const localStore = useLocalStore(() => ({
    isTop: false
  }))

  useEffect(() => {
    window.addEventListener('scroll', () => {
      localStore.isTop = window.scrollY > 20
    })
  })

  return useObserver(() =>
    <div className='comp-nav'>
      <div className={localStore.isTop ? 'nav' : 'nav-top'}>
        <div className='title'>
          <img src={logo} className='logo-img' alt='logo' /> Violet
          </div>
        <div className='right-box'>
          {store.user ? (
            <div className='user-info'>
              <img alt="avatar" className='user-avatar' src={store.user.info.avatar} />
              <Tooltip title='进入用户中心'>
                <div
                  onClick={() => {
                    window.location.href = '/user/info'
                  }}
                  className='user-name'
                >
                  {store.user.info.nickname}
                </div>
              </Tooltip>
            </div>
          ) : (
              <Button className='login-btn' type='primary'>
                <a href='/account'>Login</a>
              </Button>
            )}
        </div>
      </div>
    </div>
  );
}
