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
import StaticValues from 'src/Assets/StaticValues'
import ServiceTool from 'src/Services/ServiceTool'

interface IAppInfo extends RouteComponentProps<any> {
  UIStore?: UIStore
  appInfo?: Type.AppInfoData
  refreshAppInfo: (newAvatar: boolean) => void
}

@inject('UIStore')
@observer
class AppInfo extends Component<IAppInfo> {
  appIcon?: string
  appName: string
  @observable isEdit = false
  @observable showKey = false

  @action
  componentWillMount() {
    this.appName = this.props.match.params.id
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
  }

  goBack = () => {
    if (this.props.appInfo && this.props.appInfo.owner.type === 'org') {
      this.props.history.push('/user/apps?t=' + this.props.appInfo.owner.name)
    } else {
      this.props.history.push('/user/apps')
    }
  }

  componentDidMount() {
    document.title = '应用详情 - ' + this.appName + ' | Violet'
  }

  @action
  uploadAvatar = async (base64: string) => {
    const hide = message.loading('头像上传中....', 0)
    DevService.updateApp(
      {
        avatar: base64
      },
      this.props.appInfo!.id
    )
      .then(_ => {
        hide()
        message.success('上传成功!')
        // 刷新数据
        this.props.refreshAppInfo(true)
      })
      .catch(error => {
        ServiceTool.errorHandler(error, msg => {
          message.error('上传失败, ' + msg)
        })
      })
  }

  copyText = (text: string, msg: string) => {
    message.destroy()
    const input = document.createElement('input')
    input.setAttribute('readonly', 'readonly')
    input.setAttribute('value', text)
    document.body.appendChild(input)
    input.setSelectionRange(0, 9999)
    input.select()
    if (document.execCommand('copy')) {
      document.execCommand('copy')
      message.success(msg)
    } else {
      message.error('复制失败，请手动复制')
    }
    document.body.removeChild(input)
  }

  render() {
    if (this.props.appInfo === undefined) {
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
        <Tooltip title='修改应用图标'>
          <div className='avatar-item'>
            <AvatarSelect
              title='点击或拖动选择应用图标'
              imageURL={this.props.appInfo.info.avatar}
              setImage={this.uploadAvatar}
            />
          </div>
        </Tooltip>
        <div className='info-item'>
          <span className='info-label'>ID：</span>
          <Tooltip title='点击复制' placement='right'>
            <Tag
              className='tag-label'
              onClick={() => {
                this.copyText(this.props.appInfo!.id, '应用ID已复制到剪贴板')
              }}
              color='#fcc85d'
            >
              {this.props.appInfo.id}
            </Tag>
          </Tooltip>
        </div>
        <div className='info-item'>
          <span className='info-label'>Key：</span>
          <Tooltip
            title={!this.showKey ? '点击显示' : '点击复制'}
            placement='right'
          >
            <Tag
              className='tag-label'
              onClick={() => {
                if (this.showKey === false) {
                  this.showKey = true
                } else {
                  this.copyText(
                    this.props.appInfo!.key!,
                    '应用Key已复制到剪贴板，请妥善保管防止外泄'
                  )
                }
              }}
              color='#87d068'
            >
              {this.showKey
                ? this.props.appInfo.key
                : '************************'}
            </Tag>
          </Tooltip>
        </div>
        <div className='info-item'>
          <div className='info-label'>显示名：</div>
          <div className='info-box'>{this.props.appInfo.info.displayName}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>分类：</div>
          <div className='info-box'>
            {StaticValues.AppTypes[this.props.appInfo.type]}
          </div>
        </div>
        <div className='info-item'>
          <div className='info-label'>描述：</div>
          <div className='info-box'>{this.props.appInfo.info.description}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>主页：</div>
          <div className='info-box'>{this.props.appInfo.info.url}</div>
        </div>
        {this.props.appInfo.callbackHosts!.map((v, i) => {
          return (
            <div key={v} className='info-item'>
              <div className='info-label'> {i === 0 ? '回调域: ' : ''}</div>
              <div className='callback-line info-box'>{v}</div>
            </div>
          )
        })}
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
              initData={this.props.appInfo}
              next={isEdit => {
                if (isEdit) {
                  this.props.refreshAppInfo(false)
                }
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
