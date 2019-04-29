import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import { action, observable, runInAction } from 'mobx'
import AdminService from 'src/Services/AdminService'
import { Skeleton, Icon, Tooltip } from 'antd'
import moment from 'moment'
import UserCard from '../../Common/UserCard'

interface IRequestWaitListProps {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class RequestWaitList extends Component<IRequestWaitListProps> {
  @observable list: Admin.Requests.IRequest[]
  @observable hasMore = false
  @observable loading = true
  currentPage = 0
  batchSize = 10

  stateText = {
    0: '开发者申请',
    1: '管理员申请',
    10: '提高用户应用上限',
    11: '提高用户组织上限',
    20: '提高组织应用上限'
  }

  @action
  componentDidMount() {
    this.list = []
    this.loadList()
  }

  @action
  loadList = () => {
    this.currentPage++
    AdminService.getRequests({
      page: this.currentPage,
      limit: this.batchSize,
      state: 0
    }).then(res => {
      runInAction(() => {
        this.list.push(...res.data.data)
        this.hasMore =
          res.data.pagination.total > this.currentPage * this.batchSize
        this.loading = false
      })
    })
  }

  render() {
    if (this.loading) {
      return <Skeleton active={true} />
    }

    const waitList = this.list.map((value, index) => {
      return (
        <div key={value.name + index} className='base-card-box request-card'>
          <div className='card-time'>
            {moment(value.time).format('YYYY-MM-DD HH:mm:ss')}
          </div>
          <div className='card-title'>
            <UserCard name={value.name}>
              <span className='g-request-card-user-name'>{value.name}</span>
            </UserCard>
            提交
            <span className='user-action'>{this.stateText[value.type]}</span>
          </div>
          <div className='control-box'>
            <Tooltip title='通过申请'>
              <Icon className='control-btn check-btn' type='check' />
            </Tooltip>
            <Tooltip title='拒绝申请'>
              <Icon className='control-btn close-btn' type='close' />
            </Tooltip>
          </div>
          <div className='request-remark'>{value.remark || '无备注'}</div>
        </div>
      )
    })
    return <div>{waitList}</div>
  }
}

export default RequestWaitList
