import React, { Component } from 'react'
import { Tabs, Icon } from 'antd'

class OrganizationSetting extends Component {
  componentWillMount() {
    document.title = '应用管理 - 组织 | Violet'
  }

  render() {
    return (
      <div className='org-setting'>
        <Tabs>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='info' />
                组织信息
              </span>
            }
            key='info'
          >
            d
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='team' />
                成员管理
              </span>
            }
            key='member'
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
                组织设置
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

export default OrganizationSetting
