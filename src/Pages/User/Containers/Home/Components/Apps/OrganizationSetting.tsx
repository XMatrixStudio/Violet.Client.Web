import React, { Component } from 'react'
import { Tabs, Icon } from 'antd'
import OrgInfo from './OrganizationComp/OrgInfo'
import OrgMember from './OrganizationComp/OrgMember'
import OrgChart from './OrganizationComp/OrgChart'
import OrgSetting from './OrganizationComp/OrgSetting'

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
            <OrgInfo />
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
            <OrgMember />
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
            <OrgChart />
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
            <OrgSetting />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default OrganizationSetting
