import React, { useEffect } from 'react'
import './UserCard.less'
import { Type } from '../../services/type'
import UserService from '@/services/UserService'
import { useLocalStore, useObserver } from 'mobx-react-lite'
import { Popover, Skeleton, Icon, Button, message } from 'antd'
import { UserLevel } from '../UserLevel'

export interface IUserCardProps {
  id: string
  children?: JSX.Element
}

export function useUserCard(id: string, fetch: boolean) {
  const data = useLocalStore(() => ({
    error: false,
    user: null as Type.UserInfoData | null
  }))

  const fetchUserInfo = () => {
    if (data.user !== null || data.error) {
      return
    }
    UserService.GetUserInfoByID(id)
      .then(res => {
        data.user = res.data
      })
      .catch(_ => {
        data.error = true
      })
  }

  useEffect(() => {
    if (fetch) {
      fetchUserInfo()
    }
    // eslint-disable-next-line
  }, [fetch])

  return {
    data,
    fetchUserInfo
  }
}

export function UserCard(props: IUserCardProps) {
  const { data, fetchUserInfo } = useUserCard(
    props.id,
    props.children === undefined
  )

  return useObserver(() => {
    if (data.error) {
      return <span className='user-name'>用户已注销</span>
    }

    const CardContent =
      data.user === null ? (
        <Skeleton active={true} />
      ) : (
        <div className='own-info'>
          <img className='user-avatar' src={data.user!.info.avatar} alt='avatar' />
          <p className='user-name'>
            {data.user!.info.nickname}
            <Icon type='man' className='gender-man gender-icon' />
          </p>
          <UserLevel level={data.user!.level} />
          <div>
            {data.user!.info.location && (
              <p>地区: {data.user!.info.location}</p>
            )}
            {data.user!.info.email && <p>联系邮箱: {data.user!.info.email}</p>}
            {data.user!.info.phone && <p>联系电话: {data.user!.info.phone}</p>}
          </div>
          <Button
            icon='message'
            onClick={() => {
              message.info('暂未开放')
            }}
          >
            联系
          </Button>
        </div>
      )

    return (
      <Popover
        placement='rightTop'
        content={<div className='user-popover-box'>{CardContent}</div>}
        onVisibleChange={fetchUserInfo}
      >
        <span className='show-name'>
          {props.children || data.user === null
            ? '...'
            : data.user!.info.nickname}
        </span>
      </Popover>
    )
  })
}
