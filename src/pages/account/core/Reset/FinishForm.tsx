import { useEffect } from 'react'
import useRouter from 'use-react-router'

export function useFinishForm() {
  const { history, location } = useRouter()

  useEffect(() => {
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
