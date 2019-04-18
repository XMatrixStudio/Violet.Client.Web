import * as React from 'react'
import { inject, observer } from 'mobx-react'
import './Home.less'
import { Layout, Menu, Icon, Tooltip, Modal, Badge } from 'antd'
const { Sider, Content } = Layout
import { observable } from 'mobx'
const confirm = Modal.confirm

import Logo from '@/Assets/logo.svg'
import Avatar from '@/Assets/avatar.jpg'
import {
  RouteComponentProps,
  withRouter,
  Route,
  Switch
} from 'react-router-dom'
import Info from './Components/Info/Info'
import Nothing from './Components/Nothing/Nothing'
import { ClickParam } from 'antd/lib/menu'
import UserService from 'src/Services/UserService'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Secure from './Components/Secure/Secure'
import Auth from './Components/Auth/Auth'
import MessageIndex from './Components/Message/Index'
import Apps from './Components/Apps/Apps'
import UserStore from 'src/Store/UserStore'
import Setting from './Components/Setting/Setting'
import Help from './Components/Help/Help'
import TopBanner from './Components/Common/TopBanner'
import UIStore from 'src/Store/UIStore'
import { Location, Action } from 'history'

interface IHomeProps extends RouteComponentProps<any> {
  UserStore?: UserStore
  UIStore?: UIStore
}

@inject('UserStore', 'router', 'UIStore')
@observer
class Home extends React.Component<IHomeProps, any> {
  @observable menuKey: string

  updateMenuKey = (pathname: string) => {
    if (pathname.includes('/user/info')) {
      this.menuKey = 'info'
    } else if (pathname.includes('/user/secure')) {
      this.menuKey = 'secure'
    } else if (pathname.includes('/user/auth')) {
      this.menuKey = 'auth'
    } else if (pathname.includes('/user/message')) {
      this.menuKey = 'message'
    } else if (pathname.includes('/user/apps')) {
      this.menuKey = 'apps'
    } else if (pathname.includes('/user/setting')) {
      this.menuKey = 'setting'
    } else if (pathname.includes('/user/help')) {
      this.menuKey = 'help'
    } else {
      this.props.history.replace('/user/info')
      this.menuKey = 'info'
    }
  }

  onClickMenu = (p: ClickParam) => {
    this.menuKey = p.key
    switch (p.key) {
      case 'info':
        this.props.history.push('/user/info')
        break
      case 'secure':
        this.props.history.push('/user/secure')
        break
      case 'auth':
        this.props.history.push('/user/auth')
        break
      case 'message':
        this.props.history.push('/user/message')
        break
      case 'apps':
        this.props.history.push('/user/apps')
        break
      case 'setting':
        this.props.history.push('/user/setting')
        break
      case 'help':
        this.props.history.push('/user/help')
        break
      default:
        this.props.history.push('/user')
    }
  }

  onClickLogout = () => {
    confirm({
      title: '操作确认',
      content: '你即将退出该账号',
      okText: '退出',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk() {
        UserService.Logout()
        window.location.href = '/account'
      }
    })
  }

  componentWillMount() {
    document.title = '用户中心 | Violet'
    this.updateMenuKey(this.props.location.pathname)
    this.updateInfo()
    this.props.history.listen((location: Location, action: Action) => {
      this.updateMenuKey(location.pathname)
    })
  }

  updateInfo = () => {
    this.props.UserStore!.updateInfo(() => {
      window.location.href = '/account'
    })
  }

  public render() {
    const { sideMenu } = this.props.UIStore!.ui
    return (
      <Layout className='home'>
        <Sider
          className='home-side'
          collapsible={true}
          collapsed={sideMenu}
          onCollapse={(collapsed: boolean) => {
            this.props.UIStore!.setSideMenu(collapsed)
          }}
        >
          <div
            className='logo'
            style={{ marginLeft: sideMenu ? '18px' : '10px' }}
          >
            <img src={Logo} />
            <span style={{ display: sideMenu ? 'none' : 'inline' }}>
              Violet
            </span>
          </div>
          <div className={sideMenu ? 'user-info-small' : 'user-info'}>
            <img src={Avatar} className='user-avatar' />
            <p className='user-name'>
              ZhenlyChen
              <Tooltip placement='right' title='退出登陆'>
                <Icon
                  className='logout-btn'
                  type='logout'
                  onClick={this.onClickLogout}
                />
              </Tooltip>
            </p>
          </div>
          <Menu
            className='home-menu'
            onClick={this.onClickMenu}
            selectedKeys={[this.menuKey]}
            mode='inline'
          >
            <Menu.Item key='info'>
              <Icon type='idcard' />
              <span>个人信息</span>
            </Menu.Item>
            <Menu.Item key='secure'>
              <Icon type='safety' />
              <span>账户安全</span>
            </Menu.Item>
            <Menu.Item key='auth'>
              <Icon type='link' />
              <span>授权管理</span>
            </Menu.Item>
            <Menu.Item key='message'>
              <Icon type='message' />
              <span>通知信息</span>
              <Badge dot={true} />
            </Menu.Item>
            <Menu.Item key='apps'>
              <Icon type='code' />
              <span>应用管理</span>
            </Menu.Item>
            <Menu.Item key='setting'>
              <Icon type='setting' />
              <span>系统设置</span>
            </Menu.Item>
            <Menu.Item key='help'>
              <Icon type='question' />
              <span>反馈帮助</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          style={{
            transition: 'all 0.2s',
            marginTop: this.props.UIStore!.ui.topBanner ? '200px' : '60px'
          }}
        >
          <TopBanner />
          <Content className='home-content'>
            <TransitionGroup>
              <CSSTransition
                key={
                  this.props.location.pathname.indexOf('/', 7) === -1
                    ? this.props.location.pathname
                    : this.props.location.pathname.substr(
                        0,
                        this.props.location.pathname.indexOf('/', 7)
                      )
                }
                classNames='fade'
                exit={false}
                timeout={300}
              >
                <Switch>
                  <Route path='/user/apps' component={Apps} />
                  <Route path='/user/message' component={MessageIndex} />
                  <Route path='/user/info' component={Info} />
                  <Route path='/user/secure' component={Secure} />
                  <Route path='/user/auth' component={Auth} />
                  <Route path='/user/setting' component={Setting} />
                  <Route path='/user/help' component={Help} />
                  <Route component={Nothing} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(Home)
