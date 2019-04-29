import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import { action, observable, runInAction } from 'mobx'
import AdminService from 'src/Services/AdminService'
import { Skeleton } from 'antd'

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
        console.log(this.list)
      })
    })
  }

  render() {
    if (this.loading) {
      return <Skeleton active={true} />
    }

    const waitList = this.list.map((value, index) => {
      return (
        <div key={value.name + index} className='base-card-box'>
          {value.name} 申请 {value.remark} {value.time} {value.type}
        </div>
      )
    })
    return <div>{waitList}</div>
  }
}

export default RequestOldList
