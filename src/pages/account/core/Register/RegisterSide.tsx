import useRouter from 'use-react-router'

export function useRegisterSide() {
  const { location, history } = useRouter()

  const currentStep = (path: string) => {
    switch (path) {
      case '/account/register/info':
        return 1
      case '/account/register/finish':
        return 2
      default:
        return 0
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
