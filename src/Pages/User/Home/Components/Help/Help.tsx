import React, { Component } from 'react'
import './Help.less'
import { observer, inject } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import { Collapse, Input, Button, message } from 'antd'

interface IUIStoreProps {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class Help extends Component<IUIStoreProps> {
  componentDidMount() {
    this.props.UIStore!.setTitle('帮助', '你有什么问题么')
  }
  render() {
    return (
      <div className='help-content'>
        <div className='base-card-box'>
          <p className='help-title'>常见问题</p>
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Collapse.Panel header='什么是Violet？' key='1'>
              Violet 是一个中央授权系统，你仅需要注册一个账号，就可以登陆支持
              Violet 的所有站点
            </Collapse.Panel>
            <Collapse.Panel header='为什么用户具有不同的类型？' key='2'>
              Violet 的用户类型分为：禁封用户、正式用户、开发者、管理员
              <br />
              如果你想要把你的应用接入 Violet 中，可以申请成为开发者哟
            </Collapse.Panel>
            <Collapse.Panel header='秀秀为什么这么强？' key='3'>
              送分题，不解释
            </Collapse.Panel>
          </Collapse>
        </div>
        <div className='base-card-box'>
          <p className='help-title'>我还有问题</p>
          <Input.TextArea rows={5} />
          <Button
            className='submit-btn'
            onClick={() => {
              message.success('你的反馈已提交')
            }}
          >
            提交
          </Button>
        </div>
      </div>
    )
  }
}

export default Help
