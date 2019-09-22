import { Type } from '@/services/type'
import UserService from '@/services/UserService'
import dayjs from 'dayjs'
import { useLocalStore } from 'mobx-react-lite'
import { useEffect } from 'react'

export interface IUserCardProps {
  id: string
  children?: JSX.Element
}

export function useUserCard(props: IUserCardProps) {
  const data = useLocalStore(() => ({
    error: false,
    user: null as Type.UserInfoData | null
  }))

  const fetchUserInfo = () => {
    if (data.user !== null || data.error) {
      return
    }
    UserService.GetUserInfoByID(props.id)
      .then(res => {
        data.user = res.data
      })
      .catch(_ => {
        data.error = true
      })
  }

  const getRelativeTime = (time: Date) => {
    return dayjs(time).fromNow()
  }

  useEffect(() => {
    if (props.children === undefined) {
      fetchUserInfo()
    }
    // eslint-disable-next-line
  }, [props.children])

  return {
    data,
    fetchUserInfo,
    getRelativeTime
  }
}
