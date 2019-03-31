import React, { Component } from 'react'

import { Icon, Button, Tooltip } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import UserLevel from '../Utils/UserLevel'
import UserGender from '../Utils/UserGender'
import moment from 'moment'

interface IShowInfoProps extends RouteComponentProps<any> {
  onClickEdit: () => void
  userInfo: User.GET.ResponseBody
}

class ShowInfo extends Component<IShowInfoProps, any> {
  constructor(props: IShowInfoProps) {
    super(props)
  }
  componentDidMount() {
    document.title = '个人信息 | Violet'
  }

  render() {
    const { info } = this.props.userInfo
    return (
      <div>
        <div className='top-info'>
          <img className='user-avatar' src={info.avatar} />
          <Tooltip placement='bottom' title='修改头像'>
            <div className='edit-div'>
              <Icon type='edit' />
            </div>
          </Tooltip>
          <div className='user-base-info'>
            <div>
              <span className='user-name'>{info.nickname}</span>
              <UserLevel level={this.props.userInfo.level} />
              <Tooltip title='这是什么？'>
                <Icon
                  style={{ fontSize: '18px', cursor: 'pointer' }}
                  type='question-circle'
                  theme='twoTone'
                  twoToneColor='#71cdd2'
                />
              </Tooltip>
            </div>
            <p className='user-bio'>{info.bio || '这里是个人简介'}</p>
          </div>
        </div>
        <div className='more-info'>
          <div className='info-box'>
            <p className='info-title'>性别</p>
            <UserGender gender={info.gender} />
          </div>
          <div className='info-box'>
            <p className='info-title'>联系邮箱</p>
            <p className='info-text'>{info.email || '空'}</p>
          </div>
          <div className='info-box'>
            <p className='info-title'>联系电话</p>
            <p className='info-text'>{info.phone || '空'}</p>
          </div>
          <div className='info-box'>
            <p className='info-title'>个人主页</p>
            <p className='info-text'>{info.url || '空'}</p>
          </div>
          <div className='info-box'>
            <p className='info-title'>地区</p>
            <p className='info-text'>{info.location || '地球'}</p>
          </div>
          <div className='info-box'>
            <p className='info-title'>生日</p>
            <p className='info-text'>
              {info.birthday
                ? moment(info.birthday).format('YYYY-MM-DD')
                : '很久很久之前'}
            </p>
          </div>
          <Button onClick={this.props.onClickEdit}>编辑个人信息</Button>
          <p className='info-help-text'>
            * 使用 Violet 服务的其他用户可能会看到部分信息。
          </p>
        </div>
      </div>
    )
  }
}

export default withRouter(ShowInfo)
