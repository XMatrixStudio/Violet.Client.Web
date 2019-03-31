import React, { Component } from 'react'
import UserLevel from '../Utils/UserLevel'
import { Icon, Tooltip } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import AppCard from '../Utils/AppCard'

interface IAppPersonalProps extends RouteComponentProps<any> {}

class AppPersonal extends Component<IAppPersonalProps> {
  render() {
    return (
      <div className='app-flex-box'>
        <div className='card-box info-card'>
          <div className='title'>我的信息</div>
          <div className='info-item'>
            联系信息：
            <Tooltip placement='top' title='megashow@outlook.com'>
              <span style={{ cursor: 'default' }}>秀秀大佬</span>
            </Tooltip>
            <Tooltip placement='right' title='编辑'>
              <Icon
                className='up-icon'
                type='edit'
                theme='twoTone'
                twoToneColor='#6adcda'
                onClick={() => {
                  this.props.history.push('/user/apps/edit')
                }}
              />
            </Tooltip>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span className='level-text'>账号类型: </span>
            <UserLevel level={10} />
            <Tooltip placement='right' title='升级'>
              <Icon
                className='up-icon'
                style={{ verticalAlign: 'unset' }}
                type='up-square'
                theme='twoTone'
                twoToneColor='#6adcda'
                onClick={() => {
                  this.props.history.push('/user/apps/admin')
                }}
              />
            </Tooltip>
          </div>
          <div className='info-item'>
            应用上限：10
            <Tooltip placement='right' title='增加'>
              <Icon
                className='up-icon'
                type='plus-circle'
                theme='twoTone'
                twoToneColor='#6adcda'
                onClick={() => {
                  this.props.history.push('/user/apps/more')
                }}
              />
            </Tooltip>
          </div>
          <div className='info-item'>
            账号状态：已审核
            <Icon
              type='check-circle'
              theme='twoTone'
              twoToneColor='#6adcda'
              style={{ float: 'right', fontSize: '18px' }}
            />
          </div>
        </div>

        <AppCard
          app={{
            name: 'Coffee',
            detail: '这是一个描述文字',
            icon: 'test.png',
            status: 'running'
          }}
        />
        <AppCard
          app={{
            name: 'Icytowm',
            detail: '博客系统？',
            icon: 'test.png',
            status: 'stop'
          }}
        />
        <AppCard
          app={{
            name: 'Violet',
            detail: '中央授权系统',
            icon: 'test.png',
            status: 'new'
          }}
        />
        <div className='card-box more-card'>
          <div className='more-box'>
            <Icon type='plus-circle' theme='twoTone' twoToneColor='#6adcda' />
            <p>新建应用</p>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AppPersonal)
