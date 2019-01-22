import React, { Component } from 'react'
import { Button } from 'antd'
import { NavLink } from 'react-router-dom'

import './NavBar.less'

import logo from '@/Assets/logo.svg'

const initialState = { scroll: 0 }
type State = Readonly<typeof initialState>

class NavBar extends Component<any, any> {
  public readonly state: State = initialState

  public componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  public handleScroll = () => {
    this.setState({
      scroll: window.scrollY
    })
  }

  public render() {
    const { scroll } = this.state
    return (
      <div className='comp-nav'>
        <div className={scroll > 30 ? 'nav' : 'nav-top'}>
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
            <Button className='login-btn' size='large' type='primary'>
              <a href='/account'>Login</a>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar
