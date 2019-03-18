import React, { Component } from 'react'
import './SecureInfo.less'
import SafeImage from '@/Assets/User/safe.png'
import { Icon, Button, Rate, Divider, Timeline, message } from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import UserStore from 'src/Store/UserStore'
import moment from 'moment'

interface ISecureInfoProps extends RouteComponentProps<any> {
  UserStore?: UserStore
}

@inject('UserStore')
@observer
class SecureInfo extends Component<ISecureInfoProps, any> {
  componentDidMount() {
    document.title = '安全中心 | Violet'
  }

  statusIcon(ok: boolean) {
    if (ok === true) {
      return (
        <Icon
          className='status-icon'
          type='check-circle'
          theme='twoTone'
          twoToneColor='#52c41a'
        />
      )
    } else {
      return (
        <Icon
          className='status-icon'
          type='close-circle'
          theme='twoTone'
          twoToneColor='#eb2f96'
        />
      )
    }
  }

  deleteAccount = () => {
    message.destroy()
    message.warning('当前账号已锁定，不允许删除')
  }

  render() {
    const userInfo = this.props.UserStore!.state.info
    return (
      <div className='secure-layout'>
        {/* <p className='top-title'>
          <Icon type='safety' />
          <span>账户安全</span>
        </p> */}
        <div className='top-div'>
          <img className='safe-logo' src={SafeImage} />
          <div className='top-title'>
            <p className='secure-middle'>
              账户安全系数：<strong>80</strong>
            </p>
            <Rate disabled={true} defaultValue={4} />
          </div>
        </div>
        <div className='secure-content'>
          <Icon
            className='status-icon'
            type='safety-certificate'
            theme='twoTone'
            twoToneColor='#71cdd2'
          />
          <div className='text-box'>
            <p>
              <span className='title-text'>账号:</span>
              <span className='content-text'>{userInfo.name}</span>
            </p>
            <p className='content-text'>
              注册时间：{moment(userInfo.createTime).format('YYYY/MM/DD')}
            </p>
          </div>
          <Divider />
        </div>
        <div className='secure-content'>
          <Icon
            className='status-icon'
            type='safety-certificate'
            theme='twoTone'
            twoToneColor='#71cdd2'
          />
          <div className='text-box'>
            <p className='title-text'>最近登陆</p>
            <p className='content-text'>
              <Timeline>
                <Timeline.Item>
                  2019/2/25 14:32 广东 广州 (125.23.42.1)
                </Timeline.Item>
                <Timeline.Item>
                  2019/2/22 12:53 广东 广州 (125.23.42.1)
                </Timeline.Item>
                <Timeline.Item>
                  2019/1/12 9:32 广东 湛江 (145.64.142.12)
                </Timeline.Item>
              </Timeline>
            </p>
          </div>
          <Divider />
        </div>
        <div className='secure-content'>
          {this.statusIcon(true)}
          <div className='text-box'>
            <p className='title-text'>密码:</p>
            <p className='content-text'>于2018/2/22修改</p>
          </div>
          <Button
            type='default'
            className='edit-btn'
            onClick={() => {
              this.props.history.push('/user/secure/password')
            }}
          >
            修改密码
          </Button>
          <Divider />
        </div>
        <div className='secure-content'>
          {this.statusIcon(userInfo.email !== '')}
          <div className='text-box'>
            <p className='title-text'>绑定邮箱:</p>
            <p className='content-text'>{userInfo.email || '未绑定'}</p>
          </div>
          <Button
            type={userInfo.email !== '' ? 'default' : 'danger'}
            className='edit-btn'
            onClick={() => {
              this.props.history.push('/user/secure/email')
            }}
          >
            {userInfo.email !== '' ? '更换邮箱' : '绑定邮箱'}
          </Button>
          <Divider />
        </div>
        <div className='secure-content'>
          {this.statusIcon(userInfo.phone !== '')}
          <div className='text-box'>
            <p className='title-text'>绑定手机:</p>
            <p className='content-text'>{userInfo.phone || '未绑定'} </p>
          </div>
          <Button
            type={userInfo.phone !== '' ? 'default' : 'danger'}
            className='edit-btn'
            onClick={() => {
              this.props.history.push('/user/secure/phone')
            }}
          >
            {userInfo.phone !== '' ? '更换手机' : '绑定手机'}
          </Button>
          <Divider />
        </div>
        <div className='secure-content'>
          <Icon
            className='status-icon'
            type='info-circle'
            theme='twoTone'
            twoToneColor='#72ced3'
          />
          <div className='text-box'>
            <p className='title-text'>手机令牌:</p>
            <p className='content-text'>即将上线</p>
          </div>
        </div>
        <Divider />
        <div className='secure-content'>
          <Icon
            className='status-icon'
            type='info-circle'
            theme='twoTone'
            twoToneColor='#72ced3'
          />
          <div className='text-box'>
            <p className='title-text'>彻底删除账号</p>
            <p className='content-text'>
              注意：你的所有个人信息都会被删除，所关联的站点将不能登陆
            </p>
          </div>
          <Button
            type='danger'
            className='edit-btn'
            onClick={this.deleteAccount}
          >
            删除账号
          </Button>
        </div>
      </div>
    )
  }
}

export default SecureInfo
