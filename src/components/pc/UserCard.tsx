import React from 'react'
import './UserCard.less'
import { useObserver } from 'mobx-react-lite'
import { Popover, Skeleton, Button, message } from 'antd'
import { UserLevel } from './UserLevel'
import { IUserCardProps, useUserCard } from '../core/UserCard'

export function UserCard(props: IUserCardProps) {
  const { data, fetchUserInfo, getRelativeTime } = useUserCard(props)

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
              <p className='user-real-name'>{data.user!.name}</p>
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
