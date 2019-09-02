import * as React from 'react'
import './ResetSide.less'
import logo from '@/assets/logo.svg'
import { Icon, Steps } from 'antd'
import { Link } from 'react-router-dom'
import useReactRouter from 'use-react-router';
import { useObserver } from 'mobx-react-lite';

export interface IResetSideProps {}

export default function ResetSide(props: IResetSideProps) {

  const {location} = useReactRouter()

  const currentStep = (path: string) => {
    switch(path) {
      case '/account/reset/info':
        return 1
      case '/account/reset/finish':
        return 2
      default:
        return 0
    }
  }

  return useObserver(() => (
    <div className='layout-side layout-reset-side'>
      <div className='top-layout'>
        <img src={logo} className='logo' />
        <span className='violet'>Violet</span>
      </div>
      <div className='title'>
        <p>找回密码</p>
        <Steps direction='vertical' current={currentStep(location.pathname)}>
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
  ))
}
