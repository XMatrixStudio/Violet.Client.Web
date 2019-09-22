import * as React from 'react'
import './RegisterSide.less'
import logo from '@/assets/images/logo.svg'
import { Icon, Steps } from 'antd'
import { useObserver } from 'mobx-react-lite'
import useRouter from 'use-react-router'

export function useRegisterSide() {
  const { location, history } = useRouter()

  const currentStep = (path: string) => {
    switch (path) {
      case '/account/register/info':
        return 1
      case '/account/register/finish':
        return 2
      default:
        return 0
    }
  }

  const handleLogin = () => {
    history.push('/account' + location.search)
  }

  return {
    location,
    currentStep,
    handleLogin
  }
}

export default function RegisterSide() {
  const { location, currentStep, handleLogin } = useRegisterSide()

  return useObserver(() => (
    <div className='layout-side layout-register-side'>
      <div className='top-layout'>
        <img src={logo} className='logo' alt='logo' />
        <span className='violet'>Violet</span>
      </div>
      <div className='title'>
        <p>注册账号</p>
        <Steps direction='vertical' current={currentStep(location.pathname)}>
          <Steps.Step title='验证手机/邮箱' />
          <Steps.Step title='完善信息' />
          <Steps.Step title='注册成功' />
        </Steps>
      </div>
      <div className='bottom-layout'>
        <p className='help-text'>
          已有账号？
          <span className='link' onClick={handleLogin}>
            登陆
          </span>
        </p>
        <p className='help-layout'>
          <Icon className='info-icon' type='info-circle' theme='filled' />
          你可以使用邮箱或者手机来注册一个 Violet 账号
        </p>
      </div>
    </div>
  ))
}
