import React, { Component } from 'react'
import './Apps.less'
import DeveloperForm from './Form/DeveloperForm'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import AppManger from './AppManger'
import NewAppForm from './Form/NewAppForm'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { observer, inject } from 'mobx-react'
import OrganizationSetting from './OrganizationSetting'
import AppDetail from './AppDetail'
import UIStore from 'src/Store/UIStore'
import AppInit from './AppInit'
import UserStore from 'src/Store/UserStore'
import { observe } from 'mobx'

interface IAppsProps extends RouteComponentProps<any> {
  UIStore?: UIStore
  UserStore?: UserStore
}

@inject('UIStore', 'UserStore')
@observer
class Apps extends Component<IAppsProps> {
  title: string
  subTitle: string

  checkLevel = (pathname: string) => {
    if (
      this.props.UserStore!.state.init === false ||
      !pathname.includes('/user/apps')
    ) {
      return
    }
    const level = this.props.UserStore!.state.info.level
    if (level < 1 && pathname !== '/user/apps/not') {
      this.props.history.replace('/user/apps/not')
    } else if (
      level > 0 &&
      (pathname === '/user/apps/up/developer' || pathname === '/user/apps/not')
    ) {
      this.props.history.replace('/user/apps')
    }
  }

  componentWillMount() {
    this.props.history.listen((location, action) => {
      this.checkLevel(location.pathname)
    })
    observe(this.props.UserStore!.state, () => {
      this.checkLevel(this.props.history.location.pathname)
    })
  }

  render() {
    return (
      <div className='apps-layout'>
        <div className='apps-manger'>
          <TransitionGroup>
            <CSSTransition
              key={this.props.location.pathname.replace('/user/apps', '')}
              classNames='fade'
              exit={false}
              timeout={300}
            >
              <Switch location={this.props.location}>
                <Route path='/user/apps/not' component={AppInit} />
                <Route path='/user/apps/up/:type'>
                  <DeveloperForm
                    next={isSubmit => {
                      this.props.history.goBack()
                    }}
                  />
                </Route>
                <Route path='/user/apps/new/:by'>
                  <NewAppForm
                    next={isSubmit => {
                      this.props.history.goBack()
                    }}
                  />
                </Route>
                <Route path='/user/apps/detail/:id' component={AppDetail} />
                <Route
                  path='/user/apps/org/:id'
                  component={OrganizationSetting}
                />
                <Route path='/user/apps' component={AppManger} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

export default Apps
