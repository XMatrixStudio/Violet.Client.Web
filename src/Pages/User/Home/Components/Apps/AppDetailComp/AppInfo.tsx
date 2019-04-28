import React, { Component } from 'react'
import './AppInfo.less'
import { Tag, message, Tooltip, Button, Skeleton } from 'antd'
import AvatarSelect from '../../Common/AvatarSelect'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import AppInfoForm from './AppInfoForm'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import DevService from 'src/Services/DevService'

interface IAppInfo extends RouteComponentProps<any> {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class AppInfo extends Component<IAppInfo> {
  appIcon?: string
  appName: string
  @observable appInfo?: Type.AppInfoData
  @observable isEdit: boolean

  @action
  componentWillMount() {
    this.appName = this.props.match.params.id
    this.isEdit = false
    this.appInfo = undefined
    this.props.UIStore!.setTitle(
      <>
        <a key='link' onClick={this.goBack}>
          应用管理
        </a>
        <span key='name'> - {this.appName}</span>
      </>,
      '在这里管理你的应用'
    )
    this.props.UIStore!.setBack(this.goBack)
    DevService.getAppInfoByName(this.appName, true).then(res => {
      this.appInfo = res.data
    })
  }

  goBack = () => {
    if (this.appInfo && this.appInfo.owner.type === 'org') {
      this.props.history.push('/user/apps?t=' + this.appInfo.owner.name)
    } else {
      this.props.history.push('/user/apps')
    }
  }

  componentDidMount() {
    document.title = '应用详情 - ' + this.appName + ' | Violet'
  }

  render() {
    if (this.appInfo === undefined) {
      return (
        <div className='app-info'>
          <div
            className='base-card-box'
            style={{ minHeight: this.isEdit ? '590px' : '400px' }}
          >
            <Skeleton active={true} />
          </div>
        </div>
      )
    }

    const InfoShow = (
      <>
        <div className='avatar-item'>
          <AvatarSelect
            title='点击或拖动选择应用图标'
            imageURL={this.appInfo.info.avatar}
            setImage={file => {
              this.appIcon = file
            }}
          />
        </div>
        <div className='info-item'>
          <span className='info-label'>ID：</span>
          <Tooltip title='点击复制'>
            <Tag
              className='tag-label'
              onClick={() => {
                message.destroy()
                message.success('应用ID已复制到剪贴板')
              }}
              color='#87d068'
            >
              {this.appInfo.id}
            </Tag>
          </Tooltip>
        </div>
        <div className='info-item'>
          <span className='info-label'>Key：</span>
          <Tooltip title='点击复制'>
            <Tag
              className='tag-label'
              onClick={() => {
                message.destroy()
                message.success('应用Key已复制到剪贴板')
              }}
              color='#fcc85d'
            >
              {this.appInfo.id}
            </Tag>
          </Tooltip>
        </div>
        <div className='info-item'>
          <div className='info-label'>显示名：</div>
          <div className='info-box'>{this.appInfo.info.displayName}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>分类：</div>
          <div className='info-box'>{this.appInfo.type}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>描述：</div>
          <div className='info-box'>{this.appInfo.info.description}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>主页：</div>
          <div className='info-box'>{this.appInfo.info.url}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>回调域：</div>
          <div className='info-box'>{this.appInfo.createTime}</div>
        </div>
        <Button
          className='btn-edit'
          icon='edit'
          onClick={() => {
            this.isEdit = true
          }}
        >
          修改信息
        </Button>
      </>
    )

    return (
      <div className='app-info'>
        <div
          className='base-card-box'
          style={{ minHeight: this.isEdit ? '590px' : '400px' }}
        >
          {this.isEdit ? (
            <AppInfoForm
              initData={this.appInfo}
              next={isEdit => {
                this.isEdit = false
              }}
            />
          ) : (
            InfoShow
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(AppInfo)
