import React, { Component } from 'react'
import './OrgInfo.less'
import { inject, observer } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import { observable } from 'mobx'
import { message, Typography } from 'antd'

interface IOrgInfoProps {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class OrgInfo extends Component<IOrgInfoProps> {
  @observable orgInfo: {
    name: string
    des: string
    people: string
    email: string
  }

  constructor(props: IOrgInfoProps) {
    super(props)
    this.orgInfo = {
      name: 'XMatrix',
      des: '呵呵呵呵呵呵呵呵',
      people: '秀喜',
      email: 'megashow@outlook.com'
    }
  }

  componentWillMount() {
    this.props.UIStore!.setTitle(
      '组织管理',
      '> ' + this.orgInfo.name,
      '在这里管理你的组织'
    )
  }

  onChangeInfo = (type: string) => {
    return (value: string) => {
      message.destroy()
      message.success('修改成功')
      this.orgInfo[type] = value
      if (type === 'name') {
        this.props.UIStore!.setTitle(
          '组织管理',
          '> ' + value,
          '在这里管理你的组织'
        )
      }
    }
  }

  render() {
    return (
      <div className='org-info'>
        <div className='info-item'>
          <div className='info-label'>组织名称：</div>
          <div className='edit-box'>
            <Typography.Text editable={{ onChange: this.onChangeInfo('name') }}>
              {this.orgInfo.name}
            </Typography.Text>
          </div>
        </div>
        <div className='info-item'>
          <div className='info-label'>组织简介：</div>
          <div className='edit-box'>
            <Typography.Text editable={{ onChange: this.onChangeInfo('des') }}>
              {this.orgInfo.des}
            </Typography.Text>
          </div>
        </div>
        <div className='info-item'>
          <div className='info-label'>联系人名称：</div>
          <div className='edit-box'>
            <Typography.Text
              editable={{ onChange: this.onChangeInfo('people') }}
            >
              {this.orgInfo.people}
            </Typography.Text>
          </div>
        </div>
        <div className='info-item'>
          <div className='info-label'>联系邮箱：</div>
          <div className='edit-box'>
            <Typography.Text
              editable={{ onChange: this.onChangeInfo('email') }}
            >
              {this.orgInfo.email}
            </Typography.Text>
          </div>
        </div>
      </div>
    )
  }
}

export default OrgInfo
