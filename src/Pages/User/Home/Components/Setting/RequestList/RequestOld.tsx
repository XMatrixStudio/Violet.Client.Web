import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import { action, observable, runInAction } from 'mobx'
import AdminService from 'src/Services/AdminService'
import { Skeleton } from 'antd'
import moment from 'moment'

interface IRequestOldListProps {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class RequestOldList extends Component<IRequestOldListProps> {
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
      state: 1
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

    const oldList = this.list.map((value, index) => {
      return (
        <div key={value.name + index} className='base-card-box request-card'>
          <div className='card-time'>
            {moment(value.time).format('YYYY-MM-DD HH:mm:ss')}
          </div>
          <div className='card-title'>
            <span className='user-name'>{value.name}</span> 提交
            <span className='user-action'>{this.stateText[value.state]}</span>
          </div>
          <div className='control-box'>已通过</div>
          <div className='request-remark'>{value.remark}</div>
        </div>
      )
    })
    return <div>{oldList}</div>
  }
}

export default RequestOldList
