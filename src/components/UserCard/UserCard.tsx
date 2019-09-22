import React, { useEffect } from 'react'
import './UserCard.less'
import { Type } from '../../services/type'
import UserService from '@/services/UserService'
import { useLocalStore, useObserver } from 'mobx-react-lite'
import { Popover, Skeleton, Button, message } from 'antd'
import { UserLevel } from '../UserLevel'
import dayjs from 'dayjs'

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

  const getRelativeTime = (time: Date) => {
    return dayjs(time).fromNow()
  }

  useEffect(() => {
    if (fetch) {
      fetchUserInfo()
    }
    // eslint-disable-next-line
  }, [fetch])

  return {
    data,
    fetchUserInfo,
    getRelativeTime
  }
}

export function UserCard(props: IUserCardProps) {
  const { data, fetchUserInfo, getRelativeTime } = useUserCard(
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
          <div className='top-info'>
            <div className='card-avatar'>
              <img
                className='user-avatar'
                src={data.user!.info.avatar}
                alt='avatar'
              />
            </div>
            <div className='card-content'>
              <p>
                <span className='user-name'>{data.user!.info.nickname}</span>
                <UserLevel level={data.user!.level} />
              </p>
              <p className='user-real-name'>
                {data.user!.name}
              </p>
            </div>
          </div>
              <p className='user-old'>
                {getRelativeTime(data.user!.createTime)}来到了Violet
              </p>
          <Button
            type='link'
            block={true}
            onClick={() => {
              message.info('暂未开放')
            }}
          >
            更多
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
