import React, { Component } from 'react'
import './AppDetail.less'
import { Tabs, Icon } from 'antd'
import AppInfo from './AppDetailComp/AppInfo'
import AppChart from './AppDetailComp/AppChart'
import AppSetting from './AppDetailComp/AppSetting'
import AppMessage from './AppDetailComp/AppMessage'

class AppDetail extends Component {
  render() {
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
            <AppInfo />
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
            <AppSetting />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default AppDetail
