import React, { Component } from 'react'
import './AppDetail.less'
import { Tabs, Icon } from 'antd'
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
            d
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
            d
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
            d
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
            d
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default AppDetail
