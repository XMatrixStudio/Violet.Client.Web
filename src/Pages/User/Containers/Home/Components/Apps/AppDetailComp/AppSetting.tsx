import React, { Component } from 'react'
import './AppSetting.less'
import { Switch } from 'antd'

class AppSetting extends Component {
  render() {
    return (
      <div className='app-setting'>
        <div className='setting-item'>
          <div className='item-title'>应用状态</div>
          <div className='item-more'>你可以随时更改应用工作状态</div>
          <div className='item-control'>
            <Switch defaultChecked={true} />
          </div>
        </div>
      </div>
    )
  }
}

export default AppSetting
