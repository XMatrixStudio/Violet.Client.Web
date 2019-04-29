import React, { Component } from 'react'
import './SettingIndex.less'
import { observer, inject } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import SettingItem from './SettingItem'
import { Icon, Badge } from 'antd'
import UserStore from 'src/Store/UserStore'
import { observable, runInAction, action } from 'mobx'
import AdminService from 'src/Services/AdminService'

interface ISettingProps {
  UIStore?: UIStore
  UserStore?: UserStore
}

@inject('UIStore', 'UserStore')
@observer
class SettingIndex extends Component<ISettingProps> {
  @observable waitRequest = 0

  componentDidMount() {
    this.props.UIStore!.setTitle('系统设置', '管理你的Violet')
    this.getWaitRequestNumber()
  }

  @action
  getWaitRequestNumber = () => {
    AdminService.getRequests({ page: 1, limit: 1, state: 0 }).then(res => {
      runInAction(() => {
        this.waitRequest = res.data.pagination.total
      })
    })
  }

  render() {
    return (
      <div className='setting-index'>
        <SettingItem path='/user/setting/request'>
          <Badge count={this.waitRequest}>
            <Icon
              className='card-icon'
              type='hourglass'
              theme='twoTone'
              twoToneColor='#7bc270'
            />
          </Badge>
          <p className='card-name'>申请列表</p>
        </SettingItem>
        <SettingItem path='/user/setting/request'>
          <Icon
            className='card-icon'
            type='gold'
            theme='twoTone'
            twoToneColor='#085b82'
          />
          <p className='card-name'>人员管理</p>
        </SettingItem>
        <SettingItem path='/user/setting/request'>
          <Icon
            className='card-icon'
            type='dashboard'
            theme='twoTone'
            twoToneColor='#e4a050'
          />
          <p className='card-name'>系统监控</p>
        </SettingItem>
      </div>
    )
  }
}

export default SettingIndex
