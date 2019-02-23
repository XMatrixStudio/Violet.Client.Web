import * as React from 'react'
import { inject, observer } from 'mobx-react'
import './Home.less'
import { Layout, Menu, Icon } from 'antd'
const { Header, Sider, Content } = Layout
import { observable } from 'mobx'

import Logo from '@/Assets/logo.white.svg'
import Avatar from '@/Assets/avatar.jpg'

@inject('router')
@observer
class Home extends React.Component {
  @observable collapsed: boolean

  onCollapse = (collapsed: boolean) => {
    this.collapsed = collapsed
  }

  public render() {
    return (
      <Layout className='home'>
        <Sider
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
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1'>
              <Icon type='user' />
              <span>个人信息</span>
            </Menu.Item>
            <Menu.Item key='2'>
              <Icon type='video-camera' />
              <span>应用管理</span>
            </Menu.Item>
            <Menu.Item key='3'>
              <Icon type='upload' />
              <span>授权管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: '10px' }}>
            {' '}
            <Icon type='user' />
            <span>个人信息</span>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Home
