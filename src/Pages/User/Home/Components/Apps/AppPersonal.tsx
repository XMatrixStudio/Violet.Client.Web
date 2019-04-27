import React, { Component } from 'react'
import UserLevel from '../Common/UserLevel'
import { Icon, Tooltip } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import AppCard from '../Common/AppCard'
import { inject, observer } from 'mobx-react'
import UserStore from 'src/Store/UserStore'
import DevService from 'src/Services/DevService'
import { observable } from 'mobx'

interface IAppPersonalProps extends RouteComponentProps<any> {
  UserStore?: UserStore
}

@inject('UserStore')
@observer
class AppPersonal extends Component<IAppPersonalProps> {
  currentPage: number
  @observable myApps: Type.UserAppInfoData[]
  @observable hasMore: boolean

  constructor(props: IAppPersonalProps) {
    super(props)
    this.currentPage = 0
    this.hasMore = false
    this.myApps = []
  }

  componentWillMount() {
    this.loadApps()
  }

  loadApps = () => {
    this.currentPage++
    DevService.getUserApps(this.currentPage, 10).then(res => {
      this.myApps = res.data.data
      this.hasMore = res.data.pagination.total > 10 * this.currentPage
    })
  }

  render() {
    const userInfo = this.props.UserStore!.state.info
    const devInfo = this.props.UserStore!.state.info.dev
    if (!devInfo) {
      return null
    }

    const AppCards = this.myApps.map(value => {
      return (
        <AppCard
          key={value.name}
          app={{
            name: value.displayName,
            detail: value.description,
            icon: value.avatar,
            status: value.state
          }}
        />
      )
    })

    return (
      <div className='app-flex-box'>
        <div className='base-card-box info-card'>
          <div className='title'>我的信息</div>
          <div className='info-item'>
            联系信息：
            <Tooltip placement='top' title={devInfo.email}>
              <span style={{ cursor: 'default' }}>{devInfo.name}</span>
            </Tooltip>
            <Tooltip placement='right' title='编辑'>
              <Icon
                className='up-icon'
                type='edit'
                theme='twoTone'
                twoToneColor='#06afda'
                onClick={() => {
                  this.props.history.push('/user/apps/up/edit')
                }}
              />
            </Tooltip>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span className='level-text'>账号类型: </span>
            <UserLevel level={userInfo.level} />
            <Tooltip placement='right' title='升级'>
              <Icon
                className='up-icon'
                style={{ verticalAlign: 'unset' }}
                type='up-square'
                theme='twoTone'
                twoToneColor='#06afda'
                onClick={() => {
                  this.props.history.push('/user/apps/up/admin')
                }}
              />
            </Tooltip>
          </div>
          <div className='info-item'>
            我的应用：{devInfo.app.own}/{devInfo.app.limit}
            <Tooltip placement='right' title='增加'>
              <Icon
                className='up-icon'
                type='plus-circle'
                theme='twoTone'
                twoToneColor='#06afda'
                onClick={() => {
                  this.props.history.push('/user/apps/up/more')
                }}
              />
            </Tooltip>
          </div>
          <div className='info-item'>
            账号状态：已审核
            <Icon
              type='check-circle'
              theme='twoTone'
              twoToneColor='#06afda'
              style={{ float: 'right', fontSize: '18px' }}
            />
          </div>
        </div>

        {AppCards}

        {this.hasMore && (
          <div className='base-card-box more-card' onClick={this.loadApps}>
            <div className='more-box'>
              <Icon type='ellipsis' style={{ color: '#06afda' }} />
              <p className='title'>加载更多</p>
            </div>
          </div>
        )}

        <div
          className='base-card-box more-card'
          onClick={() => {
            this.props.history.push('/user/apps/new/me')
          }}
        >
          <div className='more-box'>
            <Icon type='plus-circle' theme='twoTone' twoToneColor='#06afda' />
            <p className='title'>新建应用</p>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AppPersonal)
