import React, { Component } from 'react'
import './SecureInfo.less'
import { Icon, Button, Rate, Divider, Modal, Input, message } from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import UserStore from 'src/Store/UserStore'
import moment from 'moment'
import UIStore from 'src/Store/UIStore'

interface ISecureInfoProps extends RouteComponentProps<any> {
  UserStore?: UserStore
  UIStore?: UIStore
}

@inject('UserStore', 'UIStore')
@observer
class SecureInfo extends Component<ISecureInfoProps, any> {
  componentWillMount() {
    document.title = '安全中心 | Violet'
    this.props.UIStore!.setTitle(
      '账户安全',
      <>
        <span key='title' className='middle-text'>
          安全等级：
        </span>
        <Rate key='rate' disabled={true} defaultValue={4} />
      </>
    )
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
    message.info('该功能开发中...')
    return
    let confirmTime = 5
    const model = Modal.confirm({
      title: '是否彻底删除当前用户',
      content: (
        <div>
          <div>你的所有个人信息都会被删除，所关联的站点将不能登陆</div>
          <div>5s后可以进行删除操作</div>
        </div>
      ),
      okText: '删除',
      okType: 'danger',
      okButtonProps: {
        disabled: true
      },
      cancelText: '取消',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      }
    })
    const timer = setInterval(() => {
      confirmTime -= 1
      model.update({
        content: (
          <div>
            <div>你的所有个人信息都会被删除，所关联的站点将不能登陆</div>
            <div>{confirmTime}s后可以进行删除操作</div>
          </div>
        )
      })
    }, 1000)
    setTimeout(() => {
      clearInterval(timer)
      model.update({
        content: (
          <div>
            <div>你的所有个人信息都会被删除，所关联的站点将不能登陆</div>
            <div>删除之后将无法恢复，验证你的密码后将进行删除</div>
            <Input.Password className='password-valid' placeholder='密码' />
          </div>
        ),
        okButtonProps: {
          disabled: false
        }
      })
    }, confirmTime * 1000)
  }

  render() {
    const userInfo = this.props.UserStore!.state.info
    return (
      <div className='secure-layout base-card-box'>
        <div className='secure-content'>
          <Icon
            className='status-icon'
            type='safety-certificate'
            theme='twoTone'
            twoToneColor='#06afda'
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
            twoToneColor='#06afda'
          />
          <div className='text-box'>
            <p className='title-text'>最近登陆</p>
            <div className='content-text'>
              暂无记录
              {/* <Timeline>
                <Timeline.Item>
                  2019/2/25 14:32 广东 广州 (125.23.42.1)
                </Timeline.Item>
                <Timeline.Item>
                  2019/2/22 12:53 广东 广州 (125.23.42.1)
                </Timeline.Item>
                <Timeline.Item>
                  2019/1/12 9:32 广东 湛江 (145.64.142.12)
                </Timeline.Item>
              </Timeline> */}
            </div>
          </div>
          <Divider />
        </div>
        <div className='secure-content'>
          {this.statusIcon(true)}
          <div className='text-box'>
            <p className='title-text'>密码:</p>
            <p className='content-text'>上次修改时间：无数据</p>
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
