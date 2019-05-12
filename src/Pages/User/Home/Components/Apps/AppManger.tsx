import React, { Component } from 'react'
import './AppManger.less'
import { Icon, Tabs, Skeleton, message } from 'antd'
import AppPersonal from './AppPersonal'
import AppOrganization from './AppOrganization'
import { RouteComponentProps, withRouter } from 'react-router'
import { observer, inject } from 'mobx-react'
import { observable, action, runInAction } from 'mobx'
import NewOrganization from './Form/NewOrganization'
import UIStore from 'src/Store/UIStore'
import UserStore from 'src/Store/UserStore'
import DevService from 'src/Services/DevService'
import ServiceTool from 'src/Services/ServiceTool'

interface IAppMangerProps extends RouteComponentProps<any> {
  UIStore?: UIStore
  UserStore?: UserStore
}

@inject('UIStore', 'UserStore')
@observer
class AppManger extends Component<IAppMangerProps> {
  @observable tabKey = 'personal'
  @observable loading: boolean
  currentOrgsPage: number
  batchSize: number
  orgs: Type.UserOrgInfoData[] = []

  @action
  componentWillMount() {
    document.title = '应用管理 | Violet'
    this.props.UIStore!.setTitle('应用管理', '在这里创建并管理你的应用')
    this.currentOrgsPage = 1
    this.batchSize = 100
    if (!this.props.UserStore!.orgs) {
      this.refreshOrgs()
    } else {
      this.updateTabView()
    }
  }

  @action
  updateTabView = () => {
    if (this.props.location.search.indexOf('?t=') !== -1) {
      this.tabKey = this.props.location.search.replace('?t=', '')
    } else {
      this.tabKey = 'personal'
    }
  }

  @action
  refreshOrgs = () => {
    this.loading = true
    // 初次加载
    if (this.currentOrgsPage === 1) {
      this.orgs = []
    }
    DevService.getDevOrgs(this.currentOrgsPage, this.batchSize)
      .then(res =>
        runInAction('updateOrgs', () => {
          this.orgs = this.orgs.concat(res.data.data)
          if (
            res.data.pagination.total >
            this.currentOrgsPage * this.batchSize
          ) {
            this.currentOrgsPage++
            this.refreshOrgs()
          } else {
            this.props.UserStore!.SetOrgs(this.orgs)
            this.updateTabView()
            this.loading = false
          }
        })
      )
      .catch(error => {
        ServiceTool.errorHandler(error, msg => {
          message.error('无法加载组织列表: ' + msg)
        })
      })
  }

  onClickTab = (key: string) => {
    this.tabKey = key
    this.props.history.replace('/user/apps?t=' + key)
  }

  render() {
    if (this.loading || !this.props.UserStore!.orgs) {
      return <Skeleton active={true} />
    }

    const orgTabs = this.props.UserStore!.orgs.map(value => {
      return (
        <Tabs.TabPane
          tab={
            <span>
              <img src={value.avatar} className='org-icon' />
              {value.name}
            </span>
          }
          key={value.name}
        >
          <AppOrganization data={value} />
        </Tabs.TabPane>
      )
    })

    return (
      <div className='app-manger-box'>
        <Tabs activeKey={this.tabKey} onTabClick={this.onClickTab}>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='star' />
                个人应用
              </span>
            }
            key='personal'
          >
            <AppPersonal />
          </Tabs.TabPane>
          {orgTabs}
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='plus' />
                新建组织
              </span>
            }
            key='new'
          >
            <NewOrganization
              next={refresh => {
                if (refresh) {
                  this.currentOrgsPage = 1
                  this.refreshOrgs()
                }
              }}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default withRouter(AppManger)
