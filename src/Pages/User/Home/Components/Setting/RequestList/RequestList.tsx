import React, { Component } from 'react'
import UIStore from 'src/Store/UIStore'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { Tabs, Icon } from 'antd'
import './RequestList.less'
import RequestWaitList from './RequestWait'
import RequestOldList from './RequestOld'

interface IRequestListProps {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class RequestList extends Component<IRequestListProps> {
  @observable tabKey = 'new'

  @action
  componentDidMount() {
    document.title = '申请列表 | Violet'
    this.props.UIStore!.setTitle('申请列表', '所有需要审核的申请')
    this.props.UIStore!.setBack('/user/setting')
  }

  @action
  onClickTab = (tab: string) => {
    this.tabKey = tab
  }

  render() {
    return (
      <div className='request-list'>
        <Tabs activeKey={this.tabKey} onTabClick={this.onClickTab}>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='profile' />
                待审核申请
              </span>
            }
            key='new'
          >
            <RequestWaitList />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <Icon type='schedule' />
                已处理申请
              </span>
            }
            key='old'
          >
            <RequestOldList />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default RequestList
