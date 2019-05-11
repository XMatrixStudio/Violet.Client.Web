import './Info.less'
import React, { Component } from 'react'

import ShowInfo from './ShowInfo'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'
import EditInfo from './EditInfo'
import { observer, inject } from 'mobx-react'
import UserStore from 'src/Store/UserStore'
import AvatarSelect from '../Common/AvatarSelect'
import { Tooltip, message } from 'antd'
import UIStore from 'src/Store/UIStore'
import { observable, observe } from 'mobx'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import UserService from 'src/Services/UserService'
import UserGender from '../Common/UserGender'

interface IInfoProps extends RouteComponentProps<any> {
  UserStore?: UserStore
  UIStore?: UIStore
}

@inject('UserStore', 'UIStore')
@observer
class Info extends Component<IInfoProps, any> {
  @observable nickname: string

  componentWillMount() {
    if (this.props.UserStore!.init) {
      this.updateTitle()
    }
    observe(this.props.UserStore!.data, () => {
      if (this.props.location.pathname.includes('/user/info')) {
        this.updateTitle()
      }
    })
  }

  updateTitle = () => {
    this.props.UIStore!.setTitle(
      'Hi, ' + this.props.UserStore!.data.info.nickname,
      this.tip(),
      '个人信息'
    )
  }

  /** 刷新用户信息 */
  refreshInfo = () => {
    this.props.UserStore!.updateInfo(() => {
      window.location.href = '/account'
    })
  }

  tip = () => {
    const hour = new Date().getHours()
    if (hour < 5) {
      return '夜已深，请注意休息'
    } else if (hour < 8) {
      return '好早啊'
    } else if (hour < 11) {
      return '忙碌的一天又开始了'
    } else if (hour < 14) {
      return '中午好'
    } else if (hour < 17) {
      return '下午好晒啊'
    } else if (hour < 20) {
      return '吃晚饭了吗'
    } else if (hour < 22) {
      return '好饱啊'
    } else {
      return '快睡觉啦'
    }
  }

  uploadAvatar = async (base64: string) => {
    const hide = message.loading('头像上传中....', 0)
    await UserService.UpdateInfo({
      info: {
        avatar: base64
      }
    })
    hide()
    message.success('上传成功!')
    this.props.UserStore!.updateInfo(undefined, true)
  }

  render() {
    const data = this.props.UserStore!.data
    return (
      <div className='info-content'>
        <div className='content-box'>
          <div className='base-card-box top-card'>
            <Tooltip title='修改头像'>
              <div className='user-avatar'>
                <AvatarSelect
                  imageURL={data.info.avatar}
                  setImage={this.uploadAvatar}
                  title='点击或拖动选择头像'
                />
              </div>
            </Tooltip>
            <div className='user-base-info'>
              <div>
                <span className='user-name'>{data.info.nickname}</span>
                <UserGender gender={data.info.gender} />
                {/* <UserLevel level={data.level} />
                <Tooltip title='这是什么？'>
                  <Icon
                    style={{ fontSize: '18px', cursor: 'pointer' }}
                    type='question-circle'
                    theme='twoTone'
                    twoToneColor='#06afda'
                    onClick={() => {
                      this.props.history.push('/user/help')
                    }}
                  />
                </Tooltip> */}
              </div>
              <p className='user-bio'>{data.info.bio || '这里是个人简介'}</p>
            </div>
          </div>

          <TransitionGroup>
            <CSSTransition
              key={this.props.location.pathname}
              classNames='fade'
              exit={false}
              timeout={300}
            >
              <Switch location={this.props.location}>
                <Route exact={true} path='/user/info/edit'>
                  <EditInfo
                    next={isEdit => {
                      if (isEdit) {
                        this.refreshInfo()
                      }
                      this.props.history.replace('/user/info')
                    }}
                    userInfo={data}
                  />
                </Route>
                <Route>
                  <ShowInfo userInfo={data} />
                </Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

export default Info
