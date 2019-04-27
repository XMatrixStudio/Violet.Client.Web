import React, { Component } from 'react'
import UserLevel from '../Common/UserLevel'
import { Icon, Button } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import AppCard from '../Common/AppCard'
import UserCard from '../Common/UserCard'

interface IAppOrganizationProps extends RouteComponentProps<any> {
  data: Type.OrgInfoData
}

class AppOrganization extends Component<IAppOrganizationProps> {
  render() {
    return (
      <div className='app-flex-box'>
        <div className='base-card-box info-card'>
          <div className='title'>组织信息</div>
          <div className='info-item'>
            创始人：
            <UserCard info={{ name: '秀秀大佬', level: 58 }} />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span className='level-text'>我的权限：</span>
            <UserLevel level={10} />
          </div>
          <div className='info-item'>
            <strong>{this.props.data.members}</strong>位成员管理着
            <strong>{this.props.data.apps}</strong>
            个应用
          </div>
          <Button
            type='primary'
            block={true}
            className='btn-org'
            onClick={() => {
              this.props.history.push('/user/apps/org/matrix')
            }}
          >
            组织设置
          </Button>
        </div>

        <AppCard
          app={{
            name: 'Coffee',
            detail: '这是一个描述文字',
            icon: 'test.png',
            status: 'running'
          }}
        />
        <div
          className='base-card-box more-card'
          onClick={() => {
            this.props.history.push('/user/apps/new/' + this.props.data.name)
          }}
        >
          <div className='more-box'>
            <Icon type='plus-circle' theme='twoTone' twoToneColor='#06afda' />
            <p>新建应用</p>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AppOrganization)
