import * as React from 'react'
import { Button } from 'antd'
import useReactRouter from 'use-react-router'

export interface IFinishFormProps {}

export default function FinishForm(props: IFinishFormProps) {
  const { history, location } = useReactRouter()

  return (
    <div className='register-form'>
      <p className='finish-text'>注册成功!</p>
      <Button
        type='primary'
        htmlType='submit'
        size='large'
        onClick={() => {
          history.push('/account' + location.search)
        }}
      >
        立即登陆
      </Button>
    </div>
  )
}
