import React, { Component } from 'react'
import { Switch, Button, Select, Modal } from 'antd'

import './OrgSetting.less'
import '../../Utils/Setting.less'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

@observer
class OrgSetting extends Component {
  @observable setting: {
    run: boolean
    notice: boolean
  }
  constructor(props: any) {
    super(props)
    this.setting = {
      run: true,
      notice: false
    }
  }
  onClickDelete = () => {
    Modal.error({
      title: '删除组织失败',
      content: '删除组织之前必须移除所有组织成员',
      okText: '确定'
    })
    // let confirmTime = 5
    // const model = Modal.confirm({
    //   title: '是否删除组织 XMatrix？',
    //   content: '删除之后将无法恢复，5s后可以进行删除操作',
    //   okText: '删除',
    //   okType: 'danger',
    //   okButtonProps: {
    //     disabled: true
    //   },
    //   cancelText: '取消',
    //   onOk() {
    //     console.log('OK')
    //   },
    //   onCancel() {
    //     console.log('Cancel')
    //   }
    // })
    // const timer = setInterval(() => {
    //   confirmTime -= 1
    //   model.update({
    //     content: '删除之后将无法恢复，' + confirmTime + 's后可以进行删除操作'
    //   })
    // }, 1000)
    // setTimeout(() => {
    //   clearInterval(timer)
    //   model.update({
    //     content: (
    //       <div>
    //         <div>删除之后将无法恢复，验证你的密码后将进行删除</div>
    //         <Input.Password className='password-valid' placeholder='密码' />
    //       </div>
    //     ),
    //     okButtonProps: {
    //       disabled: false
    //     }
    //   })
    // }, confirmTime * 1000)
  }
  render() {
    return (
      <div className='org-setting setting-form'>
        <div className='item-big-title'>个人设置</div>
        <div className='base-card-box'>
          <div className='setting-item'>
            <div className='item-info'>
              <div className='item-title'>通知提醒</div>
              <div className='item-more'>开启后收到的通知将会发往你的邮箱</div>
            </div>
            <div className='item-control'>
              {this.setting.notice ? (
                <span className='status-label status-running'>已开启</span>
              ) : (
                <span className='status-label status-stop'>已关闭</span>
              )}{' '}
              <Switch
                checked={this.setting.notice}
                onChange={() => {
                  this.setting.notice = !this.setting.notice
                }}
              />
            </div>
          </div>
          {this.setting.notice && (
            <div className='setting-item'>
              <div className='item-info'>
                <div className='item-title'>通知等级</div>
                <div className='item-more'>设置发送的通知等级</div>
              </div>
              <div className='item-control'>
                <Select defaultValue='important' style={{ width: 120 }}>
                  <Select.Option value='important'>仅重要</Select.Option>
                  <Select.Option value='all'>所有</Select.Option>
                </Select>
              </div>
            </div>
          )}
        </div>
        <div className='item-big-title'>权限管理</div>
        <div className='base-card-box'>
          <div className='setting-item'>
            <div className='item-info'>
              <div className='item-title'>应用管理</div>
              <div className='item-more'>指定哪些成员可以增加或删除应用</div>
            </div>
            <div className='item-control'>
              <Select defaultValue='admin'>
                <Select.Option value='own'>创建者</Select.Option>
                <Select.Option value='admin'>管理员</Select.Option>
                <Select.Option value='all'>所有成员</Select.Option>
              </Select>
            </div>
          </div>
          <div className='setting-item'>
            <div className='item-info'>
              <div className='item-title'>成员邀请</div>
              <div className='item-more'>指定哪些成员可以邀请新的成员</div>
            </div>
            <div className='item-control'>
              <Select defaultValue='admin'>
                <Select.Option value='own'>创建者</Select.Option>
                <Select.Option value='admin'>管理员</Select.Option>
                <Select.Option value='all'>所有成员</Select.Option>
              </Select>
            </div>
          </div>
          <div className='setting-item'>
            <div className='item-info'>
              <div className='item-title'>成员管理</div>
              <div className='item-more'>
                指定哪些成员可以删除成员、更改成员等级
              </div>
            </div>
            <div className='item-control'>
              <Select defaultValue='admin'>
                <Select.Option value='own'>创建者</Select.Option>
                <Select.Option value='admin'>管理员</Select.Option>
              </Select>
            </div>
          </div>
        </div>
        <div className='item-big-title'>组织管理</div>
        <div className='base-card-box'>
          <div className='setting-item'>
            <div className='item-info'>
              <div className='item-title'>删除组织</div>
              <div className='item-more'>删除组织之后将不可恢复</div>
            </div>
            <div className='item-control'>
              <Button type='danger' onClick={this.onClickDelete}>
                删除
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrgSetting