import React, { Component } from 'react'
import { Icon, Tooltip, Popconfirm } from 'antd'
import './MemberCard.less'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

interface IMemberCardProps {
  data: {
    name: string
    avatar: string
    type: 'admin' | 'dev' | 'wait' | 'add'
    isMe?: boolean
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
        style={{ maxHeight: this.showMore ? '200px' : '90px' }}
      >
        <div className='member-box'>
          <div className='user-info-avatar'>
            <img className='user-avatar' src={this.props.data.avatar} />
          </div>
          <div
            className='user-info-text'
            onClick={() => {
              this.showMore = !this.showMore
            }}
          >
            <div className='user-nick'>{this.props.data.name}</div>
            <div className='account-name'>helloWorld</div>
          </div>
          <div
            className='user-control'
            onClick={e => {
              e.stopPropagation()
            }}
          >
            {this.props.data.isMe !== true && (
              <>
                {this.props.data.type === 'dev' && (
                  <Tooltip title='升级为管理员'>
                    <Icon className='change-icon control-icon' type='rocket' />
                  </Tooltip>
                )}
                {this.props.data.type === 'admin' && (
                  <Tooltip title='降级为成员'>
                    <Icon className='change-icon control-icon' type='bell' />
                  </Tooltip>
                )}
                {
                  <Tooltip title='发起对话'>
                    <Icon
                      className='message-icon control-icon'
                      type='message'
                    />
                  </Tooltip>
                }
                {this.props.data.type === 'wait' && (
                  <Tooltip title='取消邀请'>
                    <Icon
                      className='disconnect-icon control-icon'
                      type='disconnect'
                    />
                  </Tooltip>
                )}
                {this.props.data.type === 'add' && (
                  <Tooltip title='邀请加入'>
                    <Icon className='add-icon control-icon' type='user-add' />
                  </Tooltip>
                )}
                {this.props.data.type !== 'wait' &&
                  this.props.data.type !== 'add' && (
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
              </>
            )}
          </div>
        </div>
        {
          <div
            className='more-info'
            style={{
              opacity: this.showMore ? 1 : 0,
              userSelect: this.showMore ? 'auto' : 'none'
            }}
          >
            <p>
              <span className='title'>联系邮箱:</span> zhenlychen@foxmail.com
            </p>
            <p>
              <span className='title'>联系电话:</span> 18823456789
            </p>
          </div>
        }
      </div>
    )
  }
}

export default MemberCard
