import React, { Component } from 'react'
import './OrgInfo.less'
import { inject, observer } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import { observable } from 'mobx'
import { Button, Skeleton, Tooltip } from 'antd'
import AvatarSelect from '../../Common/AvatarSelect'
import OrgInfoForm from './OrgInfoForm'
import { RouteComponentProps, withRouter } from 'react-router-dom'

interface IOrgInfoProps extends RouteComponentProps<any> {
  UIStore?: UIStore
  data?: Type.OrgInfoData
}

@inject('UIStore')
@observer
class OrgInfo extends Component<IOrgInfoProps> {
  @observable isEdit: boolean = false

  render() {
    if (this.props.data === undefined) {
      return <Skeleton active={true} />
    }
    const orgInfo = this.props.data

    const InfoShow = (
      <>
        <Tooltip title='修改组织图标'>
          <div className='avatar-item'>
            <AvatarSelect
              title='点击或拖动选择组织图标'
              imageURL={orgInfo.info.avatar}
              setImage={file => {
                // TODO 上传头像
              }}
            />
          </div>
        </Tooltip>
        <div className='info-item'>
          <div className='info-label'>组织名：</div>
          <div className='info-box'>
            {orgInfo.info.displayName} ({orgInfo.name})
          </div>
        </div>
        <div className='info-item'>
          <div className='info-label'>组织简介：</div>
          <div className='info-box'>{orgInfo.info.description || '空'}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>组织主页：</div>
          <div className='info-box'>{orgInfo.info.url || '空'}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>联系人名称：</div>
          <div className='info-box'>{orgInfo.info.contact || '空'}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>联系邮箱：</div>
          <div className='info-box'>{orgInfo.info.email || '空'}</div>
        </div>
        <div className='info-item'>
          <div className='info-label'>联系手机：</div>
          <div className='info-box'>{orgInfo.info.phone || '空'}</div>
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
          style={{
            minHeight: this.isEdit ? '640px' : '340px',
            maxHeight: this.isEdit ? '800px' : '420px'
          }}
        >
          {this.isEdit ? (
            <OrgInfoForm
              initData={orgInfo}
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

export default withRouter(OrgInfo)
