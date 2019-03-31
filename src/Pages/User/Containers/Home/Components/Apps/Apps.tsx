import React, { Component } from 'react'
import './Apps.less'
import { Icon, Button } from 'antd'
import DeveloperForm from './DeveloperForm'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import AppManger from './AppManger'

interface IAppsProps extends RouteComponentProps<any> {}

@observer
class Apps extends Component<IAppsProps> {
  @observable showForm = false
  componentDidMount() {
    document.title = '应用管理 | Violet'
    // if (this.props.location.pathname === '/user/apps') {
    //   this.props.history.replace('/user/apps/not')
    // }
  }

  render() {
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
        <div className='apps-manger'>
          <Switch>
            <Route path='/user/apps/not'>
              <div className='not-dev'>
                <p className='oops-icon'>
                  <Icon type='frown' theme='twoTone' twoToneColor='#7ce0de' />
                </p>
                <p>你当前还不是开发者，快点申请成为开发者吧</p>
                <Button
                  type='primary'
                  onClick={() => {
                    this.props.history.push('/user/apps/developer')
                  }}
                >
                  成为一名开发者
                </Button>
              </div>
            </Route>
            <Route path='/user/apps/developer'>
              <DeveloperForm
                next={isSubmit => {
                  this.props.history.goBack()
                }}
                type='developer'
              />
            </Route>
            <Route path='/user/apps/more'>
              <DeveloperForm
                next={isSubmit => {
                  this.props.history.goBack()
                }}
                type='more'
              />
            </Route>
            <Route path='/user/apps/admin'>
              <DeveloperForm
                next={isSubmit => {
                  this.props.history.goBack()
                }}
                type='admin'
              />
            </Route>
            <Route path='/user/apps/edit'>
              <DeveloperForm
                next={isSubmit => {
                  this.props.history.goBack()
                }}
                type='edit'
              />
            </Route>
            <Route path='/user/apps' component={AppManger} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Apps
