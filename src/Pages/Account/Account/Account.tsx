import React, { Component } from 'react'
import './Account.less'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Auth from './Components/Auth/Auth'
import Reset from './Components/Reset/Reset'
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router'
import RouterUtil from './Components/Util/RouterUtil'
import { observable, action, runInAction } from 'mobx'
import { observer } from 'mobx-react'
import DevService from 'src/Services/DevService'
import ServiceTool from 'src/Services/ServiceTool'
import { message } from 'antd'
import AppInfoModal from './Components/Auth/AppInfoModal'

interface IAccountProps extends RouteComponentProps<any> {}

@observer
class Account extends Component<IAccountProps> {
  @observable title: React.ReactNode = 'Violet'
  @observable appInfo?: Type.AppInfoData
  @observable showInfoModal = false

  @action
  componentWillMount() {
    const params = RouterUtil.getParams(this.props.location.search)
    if (params.valid) {
      DevService.getAppInfoById(params.client_id)
        .then(res => {
          runInAction(() => {
            this.appInfo = res.data
            this.title = (
              <span key='title'>
                使用 Violet 登陆{' '}
                <strong key='app-name'>{res.data.info.displayName}</strong>
              </span>
            )
          })
        })
        .catch(error => {
          ServiceTool.errorHandler(error, msg => {
            message.error('无效的应用, ' + msg)
            this.props.history.push('/account/auth')
          })
        })
    }
  }

  colorfulTop = (pathname: string) => {
    if (pathname === '/account') {
      return 'login-card'
    } else if (pathname.includes('/account/register')) {
      return 'register-card'
    } else if (pathname.includes('/account/reset')) {
      return 'reset-card'
    } else if (pathname.includes('/account/auth')) {
      return 'auth-card'
    }
    return ''
  }

  render() {
    return (
      <div className='account-div'>
        {this.appInfo && (
          <AppInfoModal
            visible={this.showInfoModal}
            close={() => {
              this.showInfoModal = false
            }}
            appInfo={this.appInfo}
          />
        )}
        <p
          className='account-title'
          onClick={() => {
            if (this.title === 'Violet') {
              window.location.href = '/' // 返回主页
            } else {
              this.showInfoModal = true
            }
          }}
        >
          {this.title}
        </p>
        <div
          className={
            'base-card-box ' + this.colorfulTop(this.props.location.pathname)
          }
        >
          <TransitionGroup>
            <CSSTransition
              key={this.props.location.pathname}
              classNames={{
                appear: 'animated fadeIn',
                appearActive: 'animated fadeIn',
                appearDone: 'animated fadeIn',
                enter: 'animated fadeIn',
                enterActive: 'animated fadeIn',
                enterDone: 'animated fadeIn'
              }}
              exit={false}
              timeout={300}
            >
              <Switch location={this.props.location}>
                <Route exact={true} path='/account' component={Login} />
                <Route path='/account/register' component={Register} />
                <Route path='/account/auth'>
                  <Auth appInfo={this.appInfo} />
                </Route>
                <Route path='/account/reset' component={Reset} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

export default withRouter(Account)
