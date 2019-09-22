import useRouter from 'use-react-router'
import { useStore } from '@/Store'
import UserService from '@/services/UserService'

export function useLoginSide() {
  const router = useRouter()
  const store = useStore()

  const handleRegister = () => {
    router.history.push('/account/register' + router.location.search)
  }

  const handleLogout = () => {
    UserService.Logout()
    store.user = null
    router.history.push('/account' + router.location.search)
  }

  return {
    store,
    handleRegister,
    handleLogout
  }
}
