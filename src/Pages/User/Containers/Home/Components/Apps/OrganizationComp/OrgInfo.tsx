import React, { Component } from 'react'
import './OrgInfo.less'
import { inject, observer } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import { observable } from 'mobx'
import { message, Button } from 'antd'
import AvatarSelect from '../../Common/AvatarSelect'
import OrgInfoForm from './OrgInfoForm'

interface IOrgInfoProps {
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class OrgInfo extends Component<IOrgInfoProps> {
  @observable orgInfo: {
    name: string
    describe: string
    people: string
    home: string
    email: string
  }
  @observable isEdit: boolean
  orgIcon?: File

  constructor(props: IOrgInfoProps) {
    super(props)
    this.orgInfo = {
      name: 'XMatrix',
      describe: '呵呵呵呵呵呵呵呵',
      people: '秀喜',
      home: 'https://xmatrix.studio',
      email: 'megashow@outlook.com'
    }
    this.isEdit = false
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
    const InfoShow = (
      <>
        <div className='avatar-item'>
          <AvatarSelect
            title='点击或拖动选择组织图标'
            imageURL='https://violet-1252808268.cos.ap-guangzhou.myqcloud.com/0.png'
            setImage={file => {
              this.orgIcon = file
            }}
          />
        </div>
        <div className='info-item'>
          <div className='info-label'>组织名称：</div>
          <div className='info-box'>{this.orgInfo.name}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>组织简介：</div>
          <div className='info-box'>{this.orgInfo.describe}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>组织主页：</div>
          <div className='info-box'>{this.orgInfo.home}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>联系人名称：</div>
          <div className='info-box'>{this.orgInfo.people}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>联系邮箱：</div>
          <div className='info-box'>{this.orgInfo.email}</div>
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
      <div className='org-info'>
        <div
          className='base-card-box'
          style={{ minHeight: this.isEdit ? '640px' : '300px' }}
        >
          {this.isEdit ? (
            <OrgInfoForm
              initData={{
                name: this.orgInfo.name,
                describe: this.orgInfo.describe,
                home: this.orgInfo.home,
                people: this.orgInfo.people,
                email: this.orgInfo.email
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

export default OrgInfo
