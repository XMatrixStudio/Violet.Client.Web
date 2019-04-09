import React, { Component } from 'react'
import './AppInfo.less'
import { Tag, message, Tooltip, Button } from 'antd'
import AvatarSelect from '../../Utils/AvatarSelect'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import UIStore from 'src/Store/UIStore'

interface IAppInfo {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class AppInfo extends Component<IAppInfo> {
  appIcon?: File
  @observable appInfo: {
    name: string
    des: string
    home: string
    callback: string
  }

  constructor(props: any) {
    super(props)
    this.appInfo = {
      name: 'Violet',
      des: '描述',
      home: 'https://xmatrix.studio',
      callback: 'https://xmatrix.stduio/hello'
    }
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
    return (
      <div className='app-info'>
        <div className='base-card-box'>
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
            <div className='edit-box'>{this.appInfo.name}</div>
          </div>
          <div className='info-item'>
            <div className='info-label'>分类：</div>
            <div className='edit-box'>工具</div>
          </div>
          <div className='info-item'>
            <div className='info-label'>描述：</div>
            <div className='edit-box'>{this.appInfo.des}</div>
          </div>
          <div className='info-item'>
            <div className='info-label'>主页：</div>
            <div className='edit-box'>{this.appInfo.home}</div>
          </div>
          <div className='info-item'>
            <div className='info-label'>回调地址：</div>
            <div className='edit-box'>{this.appInfo.callback}</div>
          </div>
          <Button className='btn-edit'>修改信息</Button>
        </div>
      </div>
    )
  }
}

export default AppInfo
