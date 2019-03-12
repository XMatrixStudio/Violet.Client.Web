import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import { NavLink, withRouter } from 'react-router-dom'

import './NavBar.less'

import logo from '@/Assets/logo.svg'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

@observer
class NavBar extends Component<any, any> {
  @observable public scrollValue = 0

  public componentDidMount() {
    window.addEventListener(
      'scroll',
      action(() => {
        this.scrollValue = window.scrollY
      })
    )
  }

  public render() {
    return (
      <div className='comp-nav'>
        <div className={this.scrollValue > 30 ? 'nav' : 'nav-top'}>
          <div className='title'>
            <img src={logo} className='logo-img' /> Violet
          </div>
          <div className='right-box'>
            <NavLink
              to='/'
              exact={true}
              className='nav-item'
              activeClassName='nav-selected'
            >
              Home
            </NavLink>
            <NavLink
              to='/about'
              exact={true}
              className='nav-item'
              activeClassName='nav-selected'
            >
              About
            </NavLink>
            <Button className='login-btn' type='primary'>
              <a href='/account'>Login</a>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NavBar)
