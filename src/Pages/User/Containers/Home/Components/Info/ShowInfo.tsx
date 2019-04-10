import React, { Component } from 'react'

import { Icon, Tooltip } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import UserGender from '../Utils/UserGender'
import moment from 'moment'
import './ShowInfo.less'

interface IShowInfoProps extends RouteComponentProps<any> {
  userInfo: User.GET.ResponseBody
}

class ShowInfo extends Component<IShowInfoProps, any> {
  userAvatar?: File
  constructor(props: IShowInfoProps) {
    super(props)
  }
  componentDidMount() {
    document.title = '个人信息 | Violet'
  }

  render() {
    const { info } = this.props.userInfo
    return (
      <div className='more-info base-card-box'>
        <Tooltip title='修改个性信息'>
          <Icon
            type='edit'
            className='edit-btn'
            onClick={() => {
              this.props.history.push('/user/info/edit')
            }}
          />
        </Tooltip>
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

        <p className='info-help-text'>
          * 使用 Violet 服务的其他用户可能会看到部分信息。
        </p>
      </div>
    )
  }
}

export default withRouter(ShowInfo)
