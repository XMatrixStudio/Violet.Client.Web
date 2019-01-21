import React, { Component } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

import './NavBar.less'

import logo from '@/Assets/logo.svg'

class NavBar extends Component {
  public render() {
    return (
      <div className='comp-nav'>
        <div className="windowsScroll > 30 ? 'nav' : 'nav-top'">
          <div className='title'>
            <img src={logo} className='logo-img' /> Violet
          </div>
          <div className='right-box'>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Button className='login-btn' size='large' type='primary'>
              Login
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar
