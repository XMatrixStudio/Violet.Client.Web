import * as React from 'react'
import './LoginSide.less'
import logo from '@/assets/logo.svg'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

export interface ILoginSideProps {}

export default function LoginSide(props: ILoginSideProps) {
  return (
    <div className='layout-side layout-login-side'>
      <div className='top-layout'>
        <img src={logo} className='logo' alt='logo'/>
        <span className='violet'>Violet</span>
      </div>
      <div className='title'>登陆账号</div>
      <div className='bottom-layout'>
        <p className='help-text'>
          没有账号？ <Link to='/account/register'>注册</Link>
        </p>
        <p className='help-layout'>
          <Icon className='info-icon' type='info-circle' theme='filled' />
          Violet 需要通过手机或者邮箱识别你的身份
        </p>
      </div>
    </div>
  )
}
