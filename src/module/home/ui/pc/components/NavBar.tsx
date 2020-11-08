import { IStyle, mergeStyleSets, PrimaryButton } from '@fluentui/react'
import { observer, useLocalObservable } from 'mobx-react'
import React, { useEffect } from 'react'
import { useStore } from 'store'
import { color, style } from 'style'
import logo from  'assets/image/logo.svg'

// 导航栏
const NavBar = observer(() => {

  const store = useStore()

  const localStore = useLocalObservable(() => ({
    isTop: false,
    toggle() {
      this.isTop = !this.isTop
    }
  }))

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (localStore.isTop !== (window.scrollY > 20)) {
        localStore.toggle()
      }
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
        minWidth: style.minWidth,
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
        fontSize: style.fontLarger,
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
      fontSize: style.fontNormal,
      color: color.textPrimary,
      ':hover': {
        color: color.textPrimaryLight
      }
    } as IStyle,
    navSelected: {
      color: color.textPrimaryLighter
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
      fontSize: style.fontNormal,
      margin: 'auto 12px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: style.transition,
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

export default NavBar
