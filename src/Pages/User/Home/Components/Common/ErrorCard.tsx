import React, { Component } from 'react'

interface IErrorCardProps {
  msg: string
}

class ErrorCard extends Component<IErrorCardProps> {
  render() {
    return (
      <div className='error-card'>
        <div className='base-card-box'>{this.props.msg}</div>
      </div>
    )
  }
}

export default ErrorCard
