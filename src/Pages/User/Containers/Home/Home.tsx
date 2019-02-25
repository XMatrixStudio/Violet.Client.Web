import * as React from 'react'
import { inject, observer } from 'mobx-react'
import './Home.less'
import { Layout, Menu, Icon, Tooltip, Modal } from 'antd'
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

interface IHomeProps extends RouteComponentProps<any> {}

@inject('router')
@observer
class Home extends React.Component<IHomeProps, any> {
  @observable collapsed: boolean
  defaultMenuKey: string

  constructor(props: IHomeProps) {
    super(props)
    this.collapsed = true
    const pathname = this.props.location.pathname
    if (pathname.includes('/user/info')) {
      this.defaultMenuKey = 'info'
    } else if (pathname.includes('/user/secure')) {
      this.defaultMenuKey = 'secure'
    } else if (pathname.includes('/user/auth')) {
      this.defaultMenuKey = 'auth'
    } else {
      this.defaultMenuKey = ''
    }
  }

  onClickMenu = (p: ClickParam) => {
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

  public render() {
    return (
      <Layout className='home'>
        <Sider
          className='home-side'
          collapsible={true}
          collapsed={this.collapsed}
          onCollapse={(collapsed: boolean) => {
            this.collapsed = collapsed
          }}
        >
          <div
            className='logo'
            style={{ marginLeft: this.collapsed ? '18px' : '10px' }}
          >
            <img src={Logo} />
            <span style={{ display: this.collapsed ? 'none' : 'inline' }}>
              Violet
            </span>
          </div>
          <div className={this.collapsed ? 'user-info-small' : 'user-info'}>
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
            mode='inline'
            defaultSelectedKeys={[this.defaultMenuKey]}
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
            </Menu.Item>
            <Menu.Item key='app'>
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
        <Layout>
          <Content className='content-layout'>
            <TransitionGroup style={{ height: '100vh' }}>
              <CSSTransition
                key={this.props.location.pathname}
                classNames='fade'
                exit={false}
                timeout={300}
              >
                <Switch>
                  <Route path='/user/info' component={Info} />
                  <Route path='/user/secure' component={Secure} />
                  <Route path='/user/auth' component={Auth} />
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
