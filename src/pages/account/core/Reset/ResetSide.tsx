import useRouter from 'use-react-router'

export function useResetSide() {
  const { location, history } = useRouter()

  const currentStep = (path: string) => {
    switch (path) {
      case '/account/reset/valid':
        return 0
      case '/account/reset/password':
        return 1
      case '/account/reset/finish':
        return 2
      case '/account/reset/feedback':
        return -2
      default:
        return -1
    }
  }

  const handleLogin = () => {
    history.push('/account' + location.search)
  }

  return {
    location,
    currentStep,
    handleLogin
  }
}
