import React, { Component } from 'react'
import './AppInfo.less'
import { Tag, message, Tooltip, Button } from 'antd'
import AvatarSelect from '../../Common/AvatarSelect'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import AppInfoForm from './AppInfoForm'

interface IAppInfo {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class AppInfo extends Component<IAppInfo> {
  appIcon?: File
  @observable appInfo: {
    name: string
    describe: string
    home: string
    callback: string
    category: string
  }
  @observable isEdit: boolean

  constructor(props: any) {
    super(props)
    this.appInfo = {
      name: 'Violet',
      describe:
        '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
      home: 'https://xmatrix.studio',
      callback: 'https://xmatrix.stduio/hello',
      category: 'tool'
    }
    this.isEdit = false
  }

  componentWillMount() {
    this.props.UIStore!.setTitle(
      '应用管理',
      '> ' + this.appInfo.name,
      '在这里管理你的应用'
    )
  }

  onChangeInfo(type: string) {
    return (value: string) => {
      this.appInfo[type] = value
      message.destroy()
      message.success('修改成功')
      if (type === 'name') {
        this.props.UIStore!.setTitle(
          '应用管理',
          '> ' + this.appInfo.name,
          '在这里管理你的应用'
        )
      }
    }
  }

  render() {
    const InfoShow = (
      <>
        <div className='avatar-item'>
          <AvatarSelect
            title='点击或拖动选择应用图标'
            imageURL='https://violet-1252808268.cos.ap-guangzhou.myqcloud.com/0.png'
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
              87d06887d06887d068
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
              fcc85dfcc85dfcc85dfcc85dfcc85dfcc85d
            </Tag>
          </Tooltip>
        </div>
        <div className='info-item'>
          <div className='info-label'>名称：</div>
          <div className='info-box'>{this.appInfo.name}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>分类：</div>
          <div className='info-box'>工具</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>描述：</div>
          <div className='info-box'>{this.appInfo.describe}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>主页：</div>
          <div className='info-box'>{this.appInfo.home}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>回调地址：</div>
          <div className='info-box'>{this.appInfo.callback}</div>
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
              initData={{
                name: this.appInfo.name,
                describe: this.appInfo.describe,
                home: this.appInfo.home,
                callback: this.appInfo.callback,
                category: this.appInfo.category
              }}
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

export default AppInfo
