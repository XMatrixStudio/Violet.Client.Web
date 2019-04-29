import React, { Component } from 'react'
import './Setting.less'
import { observer, inject } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import UserStore from 'src/Store/UserStore'
import { Switch, Route, RouteComponentProps, withRouter } from 'react-router'
import SettingIndex from './SettingIndex'
import RequestList from './RequestList/RequestList'
import { Skeleton } from 'antd'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

interface ISettingProps extends RouteComponentProps<any> {
  UIStore?: UIStore
  UserStore?: UserStore
}

@inject('UIStore', 'UserStore')
@observer
class Setting extends Component<ISettingProps> {
  render() {
    if (!this.props.UserStore!.state.init) {
      return <Skeleton active={true} />
    }
    if (this.props.UserStore!.state.info.level < 50) {
      return <div>暂无权限</div>
    }
    return (
      <div className='setting-content'>
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.pathname}
            classNames='fade'
            exit={false}
            timeout={300}
          >
            <Switch location={this.props.location}>
              <Route path='/user/setting/request' component={RequestList} />
              <Route component={SettingIndex} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

export default withRouter(Setting)
