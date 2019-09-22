import * as React from 'react'
import { Button } from 'antd'
import useRouter from 'use-react-router'

export function useFinishForm() {
  const { history, location } = useRouter()

  React.useEffect(() => {
    const state = location.state
    if (!state || !state.account) {
      // 返回上一步
      history.replace('/account/reset/valid' + location.search)
    }
  })

  const handleFinish = () => {
    history.push('/account' + location.search, location.state)
  }

  return {
    handleFinish
  }
}

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
