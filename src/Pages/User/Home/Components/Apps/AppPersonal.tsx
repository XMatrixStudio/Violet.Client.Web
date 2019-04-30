import React, { Component } from 'react'
import UserLevel from '../Common/UserLevel'
import { Icon, Tooltip, Skeleton, message, Button } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import AppCard from '../Common/AppCard'
import { inject, observer } from 'mobx-react'
import UserStore from 'src/Store/UserStore'
import DevService from 'src/Services/DevService'
import { observable, action, runInAction } from 'mobx'
import ServiceTool from 'src/Services/ServiceTool'

interface IAppPersonalProps extends RouteComponentProps<any> {
  UserStore?: UserStore
}

@inject('UserStore')
@observer
class AppPersonal extends Component<IAppPersonalProps> {
  currentPage: number = 0
  @observable myApps: Type.UserAppInfoData[]
  @observable hasMore: boolean
  @observable loading: boolean = true

  constructor(props: IAppPersonalProps) {
    super(props)
    this.loadApps(true)
  }

  @action
  loadApps = async (init?: boolean) => {
    if (init) {
      this.myApps = []
      this.hasMore = false
    }
    this.currentPage++
    await DevService.getDevApps(this.currentPage, 10)
      .then(res => {
        runInAction('UpdateApps', () => {
          this.myApps = res.data.data
          this.hasMore = res.data.pagination.total > 10 * this.currentPage
          this.loading = false
        })
      })
      .catch(error => {
        ServiceTool.errorHandler(error, msg => {
          message.error('无法加载应用列表，' + msg)
        })
      })
  }

  render() {
    if (this.loading) {
      return <Skeleton active={true} />
    }
    const { level } = this.props.UserStore!.state.info
    const devInfo = this.props.UserStore!.state.info.dev
    if (!devInfo) {
      return null
    }

    const AppCards = this.myApps.map(value => {
      return (
        <AppCard
          key={value.name}
          app={{
            name: value.name,
            displayName: value.displayName,
            detail: value.description,
            icon: value.avatar,
            status: value.state
          }}
        />
      )
    })

    let userRequesting = false
    let appRequesting = false
    for (const r of this.props.UserStore!.requests) {
      if (r.type === 1) {
        userRequesting = true
      } else if (r.type === 10) {
        appRequesting = true
      }
    }

    return (
      <div className='app-flex-box'>
        <div className='base-card-box info-card'>
          <div className='title'>我的信息</div>
          <div style={{ marginBottom: '8px' }}>
            <span className='level-text'>账号类型: </span>
            <UserLevel level={level} />
            {level < 50 &&
              (userRequesting ? (
                <Tooltip placement='right' title='申请审核中'>
                  <Icon
                    className='not-up-icon'
                    type='hourglass'
                    theme='twoTone'
                    twoToneColor='#06afda'
                  />
                </Tooltip>
              ) : (
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
              ))}
          </div>
          <div className='info-item'>
            联系信息：
            <Tooltip placement='top' title={devInfo.email}>
              <span style={{ cursor: 'default' }}>{devInfo.name}</span>
            </Tooltip>
            <Tooltip placement='right' title='开发者信息仅内部使用'>
              <Icon
                className='not-up-icon'
                type='question-circle'
                theme='twoTone'
                twoToneColor='#06afda'
              />
            </Tooltip>
          </div>
          <div className='info-item'>
            我的应用：
            <strong className='big-value'>
              {devInfo.appOwn}/{devInfo.appLimit}
            </strong>
            {appRequesting ? (
              <Tooltip placement='right' title='申请审核中'>
                <Icon
                  className='not-up-icon'
                  type='hourglass'
                  theme='twoTone'
                  twoToneColor='#06afda'
                />
              </Tooltip>
            ) : (
              <Tooltip placement='right' title='提高上限'>
                <Icon
                  className='up-icon add-app'
                  type='plus-circle'
                  theme='twoTone'
                  twoToneColor='#06afda'
                  onClick={() => {
                    this.props.history.push('/user/apps/up/more')
                  }}
                />
              </Tooltip>
            )}
          </div>
          <Button
            type='primary'
            block={true}
            className='btn-personal'
            onClick={() => {
              this.props.history.push('/user/apps/up/edit')
            }}
          >
            修改开发者信息
          </Button>
        </div>

        {AppCards}

        {this.hasMore && (
          <div
            className='base-card-box more-card'
            onClick={() => {
              this.loadApps()
            }}
          >
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
