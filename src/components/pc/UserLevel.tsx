import React from 'react'
import { Tag } from 'antd'

export interface IUserLevelProps {
  level: number
}

export function UserLevel(props: IUserLevelProps) {
  const userTagStyle = {
    marginLeft: '10px',
    verticalAlign: 'middle'
  }
  //     < 0 - 封禁用户
  // = 0 - 普通用户
  // 1 ~ 49 - 开发者
  // 50 ~ 98 - 管理员
  // 99 - 超级管理员
  const level = props.level
  if (level < 0) {
    return (
      <Tag style={userTagStyle} color='red'>
        非法用户
      </Tag>
    )
  } else if (level === 0) {
    return (
      <Tag style={userTagStyle} color='green'>
        正式用户
      </Tag>
    )
  } else if (level < 50) {
    return (
      <Tag style={userTagStyle} color='blue'>
        开发者
      </Tag>
    )
  } else if (level < 99) {
    return (
      <Tag style={userTagStyle} color='purple'>
        管理员
      </Tag>
    )
  } else if (level === 99) {
    return (
      <Tag style={userTagStyle} color='gold'>
        管理员
      </Tag>
    )
  } else {
    return (
      <Tag style={userTagStyle} color='gray'>
        未知
      </Tag>
    )
  }
}
