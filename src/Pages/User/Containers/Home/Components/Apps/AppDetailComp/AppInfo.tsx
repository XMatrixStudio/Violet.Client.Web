import React, { Component } from 'react'
import './AppInfo.less'
import { Tag, message, Tooltip, Button, Popconfirm } from 'antd'

class AppInfo extends Component {
  changeKey = () => {
    message.success('更改成功')
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
      </div>
    )
  }
}

export default AppInfo
