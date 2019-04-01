import React, { Component } from 'react'
import './AppInfo.less'
import { Tag, message, Tooltip, Button, Popconfirm } from 'antd'
import AvatarSelect from '../../Utils/AvatarSelect'

class AppInfo extends Component {
  appIcon?: File

  changeKey = () => {
    message.destroy()
    message.success('更改Key成功，请重新部署服务')
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
          <div className='icon-label'>应用图标：</div>

          <AvatarSelect
            title='点击或拖动选择应用图标'
            imageURL='https://violet-1252808268.cos.ap-guangzhou.myqcloud.com/0.png'
            setImage={file => {
              this.appIcon = file
            }}
          />
        </div>
      </div>
    )
  }
}

export default AppInfo
