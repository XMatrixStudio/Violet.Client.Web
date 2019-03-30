import React, { Component } from 'react'
import './AppManger.less'
import UserLevel from '../Info/Components/UserLevel'
import { Icon } from 'antd'
import { Button } from 'antd/lib/radio'

class AppManger extends Component {
  render() {
    return (
      <div className='app-flex-box'>
        <div className='card-box info-card'>
          <p className='title'>我的信息</p>
          <p>
            <span className='level-text'>账号类型：</span>
            <UserLevel level={10} />
          </p>
          <p>应用上限：10</p>
          <Button>升级</Button>
        </div>

        <div className='card-box app-card'>应用</div>
        <div className='card-box app-card'>应用</div>
        <div className='card-box more-card'>
          <div className='more-box'>
            <Icon type='plus-circle' theme='twoTone' />
            <p>新建应用</p>
          </div>
        </div>
      </div>
    )
  }
}

export default AppManger
