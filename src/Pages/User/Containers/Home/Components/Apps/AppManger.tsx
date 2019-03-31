import React, { Component } from 'react'
import './AppManger.less'
import { Icon, Tabs } from 'antd'
import AppPersonal from './AppPersonal'

class AppManger extends Component {
  render() {
    return (
      <div className='app-manger-box'>
        <Tabs defaultActiveKey='1'>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='star' />
                个人应用
              </span>
            }
            key='1'
          >
            <AppPersonal />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='copyright' />
                XMatrix
              </span>
            }
            key='2'
          >
            2
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='plus' />
                新建组织
              </span>
            }
            key='3'
          >
            2
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default AppManger
