import React, { Component } from 'react'
import UserLevel from '../Common/UserLevel'
import { Icon, Button } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import AppCard from '../Common/AppCard'
import { observable } from 'mobx'
import DevService from 'src/Services/DevService'
import { observer } from 'mobx-react'

interface IAppOrganizationProps extends RouteComponentProps<any> {
  data: Type.OrgInfoData
}

@observer
class AppOrganization extends Component<IAppOrganizationProps> {
  currentPage: number
  @observable OrgApps: Type.OrgAppInfoData[]
  @observable hasMore: boolean

  constructor(props: IAppOrganizationProps) {
    super(props)
    this.currentPage = 0
    this.OrgApps = []
    this.hasMore = false
  }

  componentDidMount() {
    this.loadApps()
  }

  loadApps = () => {
    this.currentPage++
    DevService.getOrgApps(this.currentPage, 10, this.props.data.name).then(
      res => {
        this.OrgApps = res.data.data
        this.hasMore = res.data.pagination.total > 10 * this.currentPage
      }
    )
  }

  render() {
    const AppCards = this.OrgApps.map(value => {
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
          <div style={{ marginBottom: '8px' }}>
            <span className='level-text'>我的权限:</span>
            <UserLevel level={10} />
          </div>
          <div className='info-item'>
            <strong className='big-value'>{this.props.data.members}</strong>
            位成员管理着
            <strong className='big-value'>{this.props.data.apps}</strong>个应用
          </div>
          <Button
            type='primary'
            block={true}
            className='btn-org'
            onClick={() => {
              this.props.history.push('/user/apps/org/matrix')
            }}
          >
            组织设置
          </Button>
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
