import React, { Component } from 'react'
import UserLevel from '../Common/UserLevel'
import { Icon, Button, Skeleton, message, Tooltip } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import AppCard from '../Common/AppCard'
import { observable, action, runInAction } from 'mobx'
import DevService from 'src/Services/DevService'
import { observer } from 'mobx-react'
import ServiceTool from 'src/Services/ServiceTool'

interface IAppOrganizationProps extends RouteComponentProps<any> {
  data: Type.UserOrgInfoData
}

@observer
class AppOrganization extends Component<IAppOrganizationProps> {
  currentPage: number = 0
  @observable orgApps: Type.OrgAppInfoData[] = []
  @observable hasMore: boolean = false
  @observable loading = true
  @observable orgInfo?: Type.OrgInfoData = undefined

  componentDidMount() {
    this.loadApps()
    this.loadOrgInfo()
  }

  @action
  loadApps = async () => {
    this.currentPage++
    DevService.getOrgApps(this.currentPage, 10, this.props.data.id)
      .then(res => {
        runInAction(() => {
          this.orgApps = res.data.data
          this.hasMore = res.data.pagination.total > 10 * this.currentPage
          this.loading = false
        })
      })
      .catch(error => {
        ServiceTool.errorHandler(error, msg => {
          message.error('无法加载组织应用列表，' + msg)
        })
      })
  }

  @action
  loadOrgInfo = async () => {
    DevService.getOrgInfoByID(this.props.data.id, true).then(res => {
      runInAction(() => {
        this.orgInfo = res.data
      })
    })
  }

  render() {
    if (this.loading) {
      return <Skeleton active={true} />
    }
    const AppCards = this.orgApps.map(value => {
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

    return (
      <div className='app-flex-box'>
        <div className='base-card-box info-card org-info-card'>
          <div className='title'>组织信息</div>
          {this.orgInfo === undefined ? (
            <Skeleton active={true} />
          ) : (
            <>
              <div style={{ marginBottom: '8px' }}>
                <span className='level-text'>我的权限:</span>
                <UserLevel level={10} />
              </div>
              <div className='info-item'>
                组织成员：
                <strong className='big-value'>
                  {this.orgInfo!.dev.memberOwn} /{' '}
                  {this.orgInfo!.dev.memberLimit}
                </strong>
                <Tooltip placement='right' title='充钱才会使你变得更强'>
                  <Icon
                    className='not-up-icon add-app'
                    type='question-circle'
                    theme='twoTone'
                    twoToneColor='#06afda'
                  />
                </Tooltip>
              </div>
              <div className='info-item'>
                组织应用：
                <strong className='big-value'>
                  {this.orgInfo!.dev.appOwn} / {this.orgInfo!.dev.appLimit}
                </strong>
                <Tooltip placement='right' title='提高上限'>
                  <Icon
                    className='up-icon add-app'
                    type='plus-circle'
                    theme='twoTone'
                    twoToneColor='#06afda'
                    onClick={() => {
                      this.props.history.push('/user/apps/up/moreOrgApp')
                    }}
                  />
                </Tooltip>
              </div>
              <Button
                type='primary'
                block={true}
                className='btn-org'
                onClick={() => {
                  this.props.history.push(
                    '/user/apps/org/' + this.props.data.name
                  )
                }}
              >
                组织设置
              </Button>
            </>
          )}
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
            this.props.history.push('/user/apps/new/' + this.props.data.name)
          }}
        >
          <div className='more-box'>
            <Icon type='plus-circle' theme='twoTone' twoToneColor='#06afda' />
            <p>新建应用</p>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AppOrganization)
