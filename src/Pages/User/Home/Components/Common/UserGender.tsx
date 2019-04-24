import React, { SFC } from 'react'
import { Icon } from 'antd'
import './UserGender.less'

interface IProps {
  gender?: number
  showLabel?: boolean
}

const UserGender: SFC<IProps> = props => {
  const gender = props.gender
  if (gender === 1) {
    return (
      <p className='info-text gender-div'>
        <Icon className='gender-icon gender-man' type='man' />{' '}
        {props.showLabel && '男'}
      </p>
    )
  } else if (gender === 2) {
    return (
      <p className='info-text gender-div'>
        <Icon className='gender-icon gender-woman' type='woman' />
        {props.showLabel && '女'}
      </p>
    )
  } else {
    return (
      <p className='info-text gender-div'>
        <Icon className='gender-icon gender-other' type='robot' />
        {props.showLabel && '其他'}
      </p>
    )
  }
}

export default UserGender
