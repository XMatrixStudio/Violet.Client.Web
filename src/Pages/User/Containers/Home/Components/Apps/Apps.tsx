import React, { Component } from 'react'
import './Apps.less'
import { Icon, Button } from 'antd'
import DeveloperForm from './DeveloperForm'
class Apps extends Component {
  componentDidMount() {
    document.title = '应用管理 | Violet'
  }

  render() {
    const AppManger = false ? (
      <DeveloperForm />
    ) : (
      <div className='not-dev'>
        <p className='oops-icon'>
          <Icon type='frown' theme='twoTone' twoToneColor='#7ce0de' />
        </p>
        <p>你当前还不是开发者，快点申请成为开发者吧</p>
        <Button type='primary'>成为一名开发者</Button>
      </div>
    )

    return (
      <div className='apps-layout'>
        <div className='top-layout'>
          <div className='top-text'>
            <p className='title'>应用管理</p>
            <p className='sub-title'>创建并管理你的应用</p>
          </div>
          <div className='right-text'>
            我的应用: <strong>0/0</strong>
          </div>
        </div>
        <div className='apps-manger'>{AppManger}</div>
      </div>
    )
  }
}

export default Apps
