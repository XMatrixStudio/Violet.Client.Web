import React from 'react'
import { Button } from 'antd'
import { useFinishForm } from '../../../core/Register/FinishForm'

export default function FinishForm() {
  const { onClickFinish } = useFinishForm()

  return (
    <div className='register-form'>
      <p className='finish-text'>注册成功!</p>
      <Button
        type='primary'
        htmlType='submit'
        size='large'
        onClick={onClickFinish}
      >
        立即登陆
      </Button>
    </div>
  )
}
