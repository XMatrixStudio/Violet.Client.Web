import React, { Component } from 'react'
import './AppInfo.less'
import { Tag, message, Tooltip, Button, Popconfirm, Typography } from 'antd'
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
    this.props.UIStore!.setTitle('> ' + this.appInfo.name, '在这里管理你的应用')
  }

  changeKey = () => {
    message.destroy()
    message.success('更改Key成功，请重新部署服务')
  }

  onChangeInfo(type: string) {
    return (value: string) => {
      this.appInfo[type] = value
      if (type === 'name') {
        this.props.UIStore!.setTitle(
          '> ' + this.appInfo.name,
          '在这里管理你的应用'
        )
      }
    }
  }

  render() {
    return (
      <div className='app-info'>
        <div className='info-item'>
          <span className='info-label'>应用ID：</span>
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
          <span className='info-label'>应用Key：</span>
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
          <Popconfirm
            title={
              <div>
                <div>当Key被泄漏时请立即更改</div>
                <div>会导致当前Key立刻失效</div>
              </div>
            }
            onConfirm={this.changeKey}
            okText='确认'
            cancelText='取消'
          >
            <Button type='dashed'>更换</Button>
          </Popconfirm>
        </div>
        <div className='info-item'>
          <div className='info-label'>应用图标：</div>
          <AvatarSelect
            title='点击或拖动选择应用图标'
            imageURL='https://violet-1252808268.cos.ap-guangzhou.myqcloud.com/0.png'
            setImage={file => {
              this.appIcon = file
            }}
          />
        </div>
        <div className='info-item'>
          <div className='info-label'>应用名称：</div>
          <div className='edit-box'>
            <Typography.Text editable={{ onChange: this.onChangeInfo('name') }}>
              {this.appInfo.name}
            </Typography.Text>
          </div>
        </div>
        <div className='info-item'>
          <div className='info-label'>应用描述：</div>
          <div className='edit-box'>
            <Typography.Text editable={{ onChange: this.onChangeInfo('des') }}>
              {this.appInfo.des}
            </Typography.Text>
          </div>
        </div>
        <div className='info-item'>
          <div className='info-label'>应用主页：</div>
          <div className='edit-box'>
            <Typography.Text editable={{ onChange: this.onChangeInfo('home') }}>
              {this.appInfo.home}
            </Typography.Text>
          </div>
        </div>
        <div className='info-item'>
          <div className='info-label'>回调地址：</div>
          <div className='edit-box'>
            <Typography.Text
              editable={{ onChange: this.onChangeInfo('callback') }}
            >
              {this.appInfo.callback}
            </Typography.Text>
          </div>
        </div>
      </div>
    )
  }
}

export default AppInfo
