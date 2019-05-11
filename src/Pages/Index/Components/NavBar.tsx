import React, { Component } from 'react'
import { Button, Tooltip } from 'antd'

import './NavBar.less'

import logo from '@/Assets/logo.svg'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import UserService from 'src/Services/UserService'

@observer
class NavBar extends Component {
  @observable isTop = false
  @observable userData?: Type.UserInfoData

  componentWillMount() {
    // 绑定滚动事件
    window.addEventListener('scroll', () => {
      this.isTop = window.scrollY > 20
    })
    // 获取用户信息
    UserService.GetInfo(info => {
      this.userData = info
    })
  }

  render() {
    return (
      <div className='comp-nav'>
        <div className={this.isTop ? 'nav' : 'nav-top'}>
          <div className='title'>
            <img src={logo} className='logo-img' /> Violet
          </div>
          <div className='right-box'>
            {this.userData ? (
              <div className='user-info'>
                <img className='user-avatar' src={this.userData.info.avatar} />
                <Tooltip title='进入用户中心'>
                  <div
                    onClick={() => {
                      window.location.href = '/user/info'
                    }}
                    className='user-name'
                  >
                    {this.userData.info.nickname}
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
    )
  }
}

export default NavBar
