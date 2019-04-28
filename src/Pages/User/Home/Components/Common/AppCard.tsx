import React, { Component } from 'react'
import './AppCard.less'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Button, Tag } from 'antd'
import Ellipsis from 'ant-design-pro/lib/Ellipsis'

interface IAppCardProps extends RouteComponentProps<any> {
  app: {
    name: string
    displayName: string
    status: number
    detail: string
    icon: string
  }
}

class AppCard extends Component<IAppCardProps> {
  statusTag = (status: number) => {
    switch (status) {
      case 0:
        return (
          <Tag className='status-tag' color='green'>
            运行中
          </Tag>
        )
      case 1:
        return (
          <Tag className='status-tag' color='red'>
            已暂停
          </Tag>
        )
      // case 'new':
      //   return (
      //     <>
      //       <Tag className='status-tag' color='green'>
      //         运行中
      //       </Tag>{' '}
      //       <Badge count={25} />
      //     </>
      //   )
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
      <div className='base-card-box app-card'>
        <img src={this.props.app.icon} className='app-icon' />
        <div className='title'>{this.props.app.displayName}</div>
        <Ellipsis lines={1} className='sub-title'>
          {this.props.app.detail}
        </Ellipsis>
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
