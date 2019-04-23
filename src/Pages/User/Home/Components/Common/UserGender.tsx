import React, { SFC } from 'react'
import { Icon } from 'antd'

interface IProps {
  gender?: number
}

const UserGender: SFC<IProps> = props => {
  const gender = props.gender
  if (gender === 1) {
    return (
      <p className='info-text'>
        <Icon className='gender-icon gender-man' type='man' />男
      </p>
    )
  } else if (gender === 2) {
    return (
      <p className='info-text'>
        <Icon className='gender-icon gender-woman' type='woman' />女
      </p>
    )
  } else {
    return (
      <p className='info-text'>
        <Icon className='gender-icon gender-other' type='robot' />
        未知
      </p>
    )
  }
}

export default UserGender
