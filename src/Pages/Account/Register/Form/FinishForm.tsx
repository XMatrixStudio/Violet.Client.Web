import * as React from 'react'
import { Button } from 'antd'
import useRouter from 'use-react-router'

export interface IFinishFormProps {}

export default function FinishForm(props: IFinishFormProps) {
  const { history, location } = useRouter()

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
