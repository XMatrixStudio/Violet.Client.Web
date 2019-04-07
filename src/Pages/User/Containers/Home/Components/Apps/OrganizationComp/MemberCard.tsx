import React, { Component } from 'react'
import { Icon, Tooltip, Popconfirm } from 'antd'
import './MemberCard.less'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

interface IMemberCardProps {
  data: {
    name: string
    avatar: string
    canChange: boolean
    canUp?: boolean
    canChat?: boolean
  }
}

@observer
class MemberCard extends Component<IMemberCardProps> {
  @observable showMore: boolean

  constructor(props: IMemberCardProps) {
    super(props)
    this.showMore = false
  }

  render() {
    return (
      <div
        className='base-card-box'
        onClick={() => {
          this.showMore = !this.showMore
        }}
      >
        <div className='member-box'>
          <div className='user-info-avatar'>
            <img className='user-avatar' src={this.props.data.avatar} />
          </div>
          <div className='user-info-text'>{this.props.data.name}</div>
          <div
            className='user-control'
            onClick={e => {
              e.stopPropagation()
            }}
          >
            {this.props.data.canChange &&
              (this.props.data.canUp ? (
                <Tooltip title='升级为管理员'>
                  <Icon className='change-icon control-icon' type='rocket' />
                </Tooltip>
              ) : (
                <Tooltip title='降级为成员'>
                  <Icon className='change-icon control-icon' type='bell' />
                </Tooltip>
              ))}
            {this.props.data.canChat === true && (
              <Tooltip title='发起对话'>
                <Icon className='message-icon control-icon' type='message' />
              </Tooltip>
            )}
            {this.props.data.canChange && (
              <Popconfirm
                title={'是否将' + this.props.data.name + '移出组织'}
                okType='danger'
                okText='是'
                placement='bottom'
                cancelText='否'
                onConfirm={() => {
                  console.log('del')
                }}
              >
                <Tooltip title='移出组织'>
                  <Icon
                    className='delete-icon control-icon'
                    type='user-delete'
                  />
                </Tooltip>
              </Popconfirm>
            )}
          </div>
        </div>
        {this.showMore && (
          <div className='more-info'>
            <p>联系邮箱: zhenlychen@foxmail.com</p>
            <p>联系电话: 18823456789</p>
          </div>
        )}
      </div>
    )
  }
}

export default MemberCard
