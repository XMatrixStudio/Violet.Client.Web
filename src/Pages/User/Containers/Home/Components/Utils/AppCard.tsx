import React, { Component } from 'react'
import './AppCard.less'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Button, Tag, Badge } from 'antd'
import DefaultAppIcon from '@/Assets/icytown.png'

interface IAppCardProps extends RouteComponentProps<any> {
  app: {
    name: string
    status: string
    detail: string
    icon: string
  }
}

class AppCard extends Component<IAppCardProps> {
  statusTag = (status: string) => {
    switch (status) {
      case 'running':
        return (
          <Tag className='status-tag' color='green'>
            运行中
          </Tag>
        )
      case 'stop':
        return (
          <Tag className='status-tag' color='red'>
            已暂停
          </Tag>
        )
      case 'new':
        return (
          <>
            <Tag className='status-tag' color='green'>
              运行中
            </Tag>{' '}
            <Badge count={25} />
          </>
        )
      default:
        return (
          <Tag className='status-tag' color='grey'>
            未知
          </Tag>
        )
    }
  }

  render() {
    return (
      <div className='card-box app-card'>
        <img src={DefaultAppIcon} className='app-icon' />
        <div className='title'>{this.props.app.name}</div>
        <div className='sub-title'>{this.props.app.detail}</div>
        <div className='app-status'>
          {this.statusTag(this.props.app.status)}
        </div>
        <Button
          type='primary'
          block={true}
          onClick={() => {
            this.props.history.push('/user/apps/detail/' + this.props.app.name)
          }}
        >
          应用详情
        </Button>
      </div>
    )
  }
}

export default withRouter(AppCard)
