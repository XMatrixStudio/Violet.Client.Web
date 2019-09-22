import React from 'react'
import { Button } from 'antd'
import useRouter from 'use-react-router'

export function useFinishForm() {
  const router = useRouter()
  React.useEffect(() => {
    const state = router.location.state
    if (!state || !state.account) {
      // 非法请求，返回初始界面
      router.history.replace('/account/register' + router.location.search)
    }
  })

  const onClickFinish = () => {
    router.history.push(
      '/account' + router.location.search,
      router.location.state
    )
  }

  return {
    onClickFinish
  }
}

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
