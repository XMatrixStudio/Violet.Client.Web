import useRouter from 'use-react-router'

export function useChooseForm() {
  const router = useRouter()

  const handleValid = () => {
    router.history.push('/account/reset/valid' + router.location.search)
  }

  const handleFeedback = () => {
    router.history.push('/account/reset/feedback' + router.location.search)
  }

  return {
    handleValid,
    handleFeedback
  }
}
