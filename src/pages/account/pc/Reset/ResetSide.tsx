import * as React from 'react'
import './ResetSide.less'
import logo from '@/assets/images/logo.svg'
import { Icon, Steps } from 'antd'
import { useObserver } from 'mobx-react-lite'
import { useResetSide } from '../../core/Reset/ResetSide'

export default function ResetSide() {
  const { location, currentStep, handleLogin } = useResetSide()

  const CurrentSide = (path: string) => {
    const step = currentStep(path)
    if (step >= 0) {
      return (
        <Steps direction='vertical' current={currentStep(location.pathname)}>
          <Steps.Step title='验证手机/邮箱' />
          <Steps.Step title='输入新密码' />
          <Steps.Step title='设置成功' />
        </Steps>
      )
    } else if (step === -2) {
      return <p className='sub-title'>通过人工申诉找回密码</p>
    } else {
      return <p className='sub-title'>请选择找回密码的方式</p>
    }
  }

  return useObserver(() => (
    <div className='layout-side layout-reset-side'>
      <div className='top-layout'>
        <img src={logo} className='logo' alt='logo' />
        <span className='violet'>Violet</span>
      </div>
      <div className='title'>
        <p>找回密码</p>
        {CurrentSide(location.pathname)}
      </div>
      <div className='bottom-layout'>
        <p className='help-text'>
          想起来了？
          <span className='link' onClick={handleLogin}>
            登陆
          </span>
        </p>
        <p className='help-layout'>
          <Icon className='info-icon' type='info-circle' theme='filled' />
          你可以使用多种方式来找回你的密码
        </p>
      </div>
    </div>
  ))
}
