import * as React from 'react'
import { inject, observer } from 'mobx-react'
import './Home.less'
import { Layout, Menu, Icon } from 'antd'
const { Header, Sider, Content } = Layout
import { observable } from 'mobx'

import Logo from '@/Assets/logo.svg'
import Avatar from '@/Assets/avatar.jpg'
import { RouteComponentProps } from 'react-router-dom'

interface IHomeProps extends RouteComponentProps<any> {}

@inject('router')
@observer
class Home extends React.Component<IHomeProps, any> {
  @observable collapsed: boolean

  constructor(props: IHomeProps) {
    super(props)
    this.collapsed = true
  }

  onCollapse = (collapsed: boolean) => {
    this.collapsed = collapsed
  }

  public render() {
    return (
      <Layout className='home'>
        <Sider
          className='home-side'
          collapsible={true}
          collapsed={this.collapsed}
          onCollapse={this.onCollapse}
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
            <p>ZhenlyChen</p>
          </div>
          <Menu mode='inline' defaultSelectedKeys={['user']}>
            <Menu.Item key='user'>
              <Icon type='user' />
              <span>个人信息</span>
            </Menu.Item>
            <Menu.Item key='auth'>
              <Icon type='safety' />
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
          <Content className='content-layout'>Content</Content>
        </Layout>
      </Layout>
    )
  }
}

export default Home
