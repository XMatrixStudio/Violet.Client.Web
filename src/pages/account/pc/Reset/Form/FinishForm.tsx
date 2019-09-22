import React from 'react'
import { Button } from 'antd'
import { useFinishForm } from '../../../core/Reset/FinishForm'

export default function FinishForm() {
  const { handleFinish } = useFinishForm()

  return (
    <div className='reset-form'>
      <p className='finish-text'>重置密码成功!</p>
      <Button
        type='primary'
        htmlType='submit'
        size='large'
        onClick={handleFinish}
      >
        立即登陆
      </Button>
    </div>
  )
}
