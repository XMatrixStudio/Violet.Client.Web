import * as React from 'react'
import './RegisterSide.less'
import logo from '@/assets/logo.svg'
import { Icon, Steps } from 'antd'
import { Link } from 'react-router-dom'

export interface IRegisterSideProps {}

export default function RegisterSide(props: IRegisterSideProps) {
  return (
    <div className='layout-side layout-register-side'>
      <div className='top-layout'>
        <img src={logo} className='logo' />
        <span className='violet'>Violet</span>
      </div>
      <div className='title'>
        <p>注册账号</p>
        <Steps direction='vertical' current={0}>
          <Steps.Step title='验证手机/邮箱' />
          <Steps.Step title='完善信息' />
          <Steps.Step title='注册成功' />
        </Steps>
      </div>
      <div className='bottom-layout'>
        <p className='help-text'>
          已有账号？ <Link to='/account'>登陆</Link>
        </p>
        <p className='help-layout'>
          <Icon className='info-icon' type='info-circle' theme='filled' />
          你可以使用邮箱或者手机来注册一个 Violet 账号
        </p>
      </div>
    </div>
  )
}
