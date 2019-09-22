import React from 'react'
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
