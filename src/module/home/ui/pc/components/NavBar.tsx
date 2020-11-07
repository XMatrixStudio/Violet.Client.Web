import { IStyle, mergeStyleSets, PrimaryButton } from '@fluentui/react'
import { observer, useLocalObservable } from 'mobx-react'
import React, { useEffect } from 'react'
import { useStore } from 'store'
import logo from 'assets/logo.svg'
import { color, style } from 'style'

export default observer(() => {

  const store = useStore()

  const localStore = useLocalObservable(() => ({
    isTop: false
  }))

  useEffect(() => {
    window.addEventListener('scroll', () => {
      localStore.isTop = window.scrollY > 20
    })
  })

  const LoginHandler = () => {
    console.log('login')
  }

  const isTop = localStore.isTop
  const styles = mergeStyleSets({
    layoutNav: [
      {
        zIndex: 1024,
        display: 'flex',
        position: 'absolute',
        width: '100%',
        minWidth: 460,
        marginTop: 36
      } as IStyle,
      isTop && {
        marginTop: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        background: color.background,
        boxShadow: style.layoutShadow,
      } as IStyle
    ],
    title: [
      {
        userSelect: 'none',
        display: 'inline',
        fontSize: 24,
        marginLeft: '6%'
      } as IStyle,
      isTop && {
        marginTop: 16
      } as IStyle
    ],
    logo: {
      height: 30,
      verticalAlign: 'sub'
    } as IStyle,
    layoutControl: [
      {
        marginLeft: 'auto',
        marginRight: 30,
        '& a': {
          textDecoration: 'none'
        } as IStyle
      } as IStyle,
      isTop && {
        marginTop: 10
      } as IStyle
    ],
    navItem: {
      userSelect: 'none',
      margin: 14,
      fontSize: 16,
      color: 'rgba(54, 88, 126, 0.788)',
      ':hover': {
        color: 'rgb(76, 194, 200)'
      }
    } as IStyle,
    navSelected: {
      color: 'rgba(76, 194, 200, 0.815)'
    } as IStyle,
    loginBtn: [
      {
        marginTop: 8,
        marginLeft: 20,
        boxShadow: style.buttonShadow
      } as IStyle,
      isTop && {
        verticalAlign: 'bottom',
        boxShadow: 'none',
        ':focus': {
          boxShadow: 'none'
        } as IStyle,
        ':hover': {
          boxShadow: 'none'
        } as IStyle
      } as IStyle
    ],
    userInfo: [
      isTop && {
        marginTop: 8
      } as IStyle
    ],
    userName: {
      fontSize: 16,
      margin: 'auto 12px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'all .2s',
      display: 'inline-block',
      ":hover": {
        transform: 'translateY(-2px)'
      } as IStyle
    } as IStyle,
    userAvatar: {
      width: 32,
      height: 32,
      borderRadius: '50%'
    } as IStyle
  })

  return (
    <div className={styles.layoutNav}>
      <div className={styles.title}>
        <img src={logo} className={styles.logo} alt='logo' /> Violet
      </div>
      <div className={styles.layoutControl}>
        {store.user ? (
          <div className={styles.userInfo}>
            {/* <img
                alt='avatar'
                className='user-avatar'
                src={store.user.info.avatar}
              /> */}
            {/* <Tooltip title='进入用户中心'>
                <div
                  onClick={() => {
                    window.location.href = '/user/info'
                  }}
                  className='user-name'
                >
                  {store.user.info.nickname}
                </div>
              </Tooltip> */}
          </div>
        ) : (
            <PrimaryButton className={styles.loginBtn} onClick={LoginHandler}>
              Login
            </PrimaryButton>
          )}
      </div>
    </div>
  )
})