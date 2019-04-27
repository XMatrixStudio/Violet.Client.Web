import React, { Component } from 'react'
import './AppManger.less'
import { Icon, Tabs } from 'antd'
import AppPersonal from './AppPersonal'
import AppOrganization from './AppOrganization'
import { RouteComponentProps, withRouter } from 'react-router'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import NewOrganization from './Form/NewOrganization'
import UIStore from 'src/Store/UIStore'
import UserStore from 'src/Store/UserStore'
import DevService from 'src/Services/DevService'

interface IAppMangerProps extends RouteComponentProps<any> {
  UIStore?: UIStore
  UserStore?: UserStore
}

@inject('UIStore', 'UserStore')
@observer
class AppManger extends Component<IAppMangerProps> {
  @observable tabKey = 'personal'
  currentOrgsPage = 1
  batchSize = 100

  componentWillMount() {
    document.title = '应用管理 | Violet'
    this.props.UIStore!.setTitle('应用管理', '在这里创建并管理你的应用')
  }

  componentDidMount() {
    this.currentOrgsPage = 1
    this.refreshOrgs()
  }

  refreshOrgs = () => {
    DevService.getDevOrgs(this.currentOrgsPage, this.batchSize).then(res => {
      if (res.data.pagination.total > this.currentOrgsPage * this.batchSize) {
        this.currentOrgsPage++
        this.refreshOrgs()
      } else {
        if (this.props.location.search.indexOf('?t=') !== -1) {
          this.tabKey = this.props.location.search.replace('?t=', '')
        } else {
          this.tabKey = 'personal'
        }
      }
      this.props.UserStore!.addOrgs(res.data.data, this.currentOrgsPage === 1)
    })
  }

  onClickTab = (key: string) => {
    this.tabKey = key
    this.props.history.replace('/user/apps?t=' + key)
  }

  render() {
    const orgTabs = this.props.UserStore!.orgs.map(value => {
      return (
        <Tabs.TabPane
          tab={
            <span>
              <img src={value.avatar} className='org-icon' />
              {value.name}
            </span>
          }
          key='matrix'
        >
          <AppOrganization data={value} />
        </Tabs.TabPane>
      )
    })

    return (
      <div className='app-manger-box'>
        <Tabs
          activeKey={this.tabKey}
          onTabClick={this.onClickTab}
          animated={false}
        >
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
