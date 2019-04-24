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
import DefaultAppIcon from '@/Assets/icytown.png'

interface IAppMangerProps extends RouteComponentProps<any> {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class AppManger extends Component<IAppMangerProps> {
  @observable tabKey = 'personal'

  componentWillMount() {
    document.title = '应用管理 | Violet'
    this.props.UIStore!.setTitle('应用管理', '在这里创建并管理你的应用')
  }

  componentDidMount() {
    if (this.props.location.search.indexOf('?t=') !== -1) {
      this.tabKey = this.props.location.search.replace('?t=', '')
    } else {
      this.tabKey = 'personal'
    }
  }

  onClickTab = (key: string) => {
    this.tabKey = key
    this.props.history.replace('/user/apps?t=' + key)
  }

  render() {
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
          <Tabs.TabPane
            tab={
              <span>
                {/* <Icon type='copyright' /> */}
                <img src={DefaultAppIcon} className='org-icon' />
                XMatrix
              </span>
            }
            key='matrix'
          >
            <AppOrganization />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='plus' />
                新建组织
              </span>
            }
            key='new'
          >
            <NewOrganization />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default withRouter(AppManger)
