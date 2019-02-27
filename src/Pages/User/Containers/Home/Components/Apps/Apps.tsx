import React, { Component } from 'react'
import './Apps.less'
class Apps extends Component {
  render() {
    return (
      <div className='apps-layout'>
        <div className='top-layout'>
          <div className='top-text'>
            <p className='title'>应用管理</p>
            <p className='sub-title'>创建并管理你的应用</p>
          </div>
          <div className='right-text'>
            我的应用: <strong>2/5</strong>
          </div>
        </div>
      </div>
    )
  }
}

export default Apps
