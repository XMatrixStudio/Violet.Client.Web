import React, { Component } from 'react'
import './AppDetail.less'
import { Tabs, Icon, Skeleton } from 'antd'
import AppInfo from './AppDetailComp/AppInfo'
import AppChart from './AppDetailComp/AppChart'
import AppSetting from './AppDetailComp/AppSetting'
import AppMessage from './AppDetailComp/AppMessage'
import DevService from 'src/Services/DevService'
import { runInAction, observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { RouteComponentProps, withRouter } from 'react-router'

interface IAppDetailProps extends RouteComponentProps<any> {}

@observer
class AppDetail extends Component<IAppDetailProps> {
  @observable appInfo?: Type.AppInfoData
  appName: string

  componentWillMount() {
    this.appName = this.props.match.params.id
    this.refreshAppInfo(false)
  }

  @action
  refreshAppInfo = (newAvatar?: boolean) => {
    DevService.getAppInfoByName(this.appName, true).then(res => {
      runInAction(() => {
        this.appInfo = res.data
        if (newAvatar === true) {
          this.appInfo.info.avatar += '?t=' + new Date().getTime()
        }
      })
    })
  }

  render() {
    if (this.appInfo === undefined) {
      return (
        <div className='app-detail'>
          <Skeleton active={true} />
        </div>
      )
    }

    return (
      <div className='app-detail'>
        <Tabs>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='info' />
                应用信息
              </span>
            }
            key='info'
          >
            <AppInfo
              appInfo={this.appInfo}
              refreshAppInfo={this.refreshAppInfo}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='message' />
                消息管理
              </span>
            }
            key='message'
          >
            <AppMessage />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='line-chart' />
                统计信息
              </span>
            }
            key='chart'
          >
            <AppChart />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='setting' />
                应用设置
              </span>
            }
            key='setting'
          >
            <AppSetting
              appInfo={this.appInfo}
              refreshAppInfo={this.refreshAppInfo}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default withRouter(AppDetail)
