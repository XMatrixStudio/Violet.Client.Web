import React, { Component } from 'react'
import './AppInfoModal.less'
import { Modal, Button } from 'antd'
import UserCard from 'src/Pages/User/Home/Components/Common/UserCard'

interface IAppInfoModalProps {
  visible: boolean
  close: () => void
  appInfo: Type.AppInfoData
}

class AppInfoModal extends Component<IAppInfoModalProps> {
  render() {
    return (
      <div>
        <Modal
          className='info-modal'
          title='应用信息'
          visible={this.props.visible}
          centered={true}
          footer={null}
          mask={false}
          closable={true}
          onCancel={this.props.close}
        >
          <div className='info-item'>
            <span className='item-label'>应用名：</span>
            {this.props.appInfo.info.displayName} ({this.props.appInfo.name}){' '}
          </div>

          <div className='info-item'>
            {this.props.appInfo.owner.type === 'user' ? (
              <div>
                <span className='item-label'>开发者：</span>
                <UserCard name={this.props.appInfo.owner.name} />
              </div>
            ) : (
              <div>
                <span className='item-label'>开发组织: </span>
                {this.props.appInfo.owner.name}
              </div>
            )}
          </div>

          <div className='info-item'>
            <span className='item-label'>应用简介：</span>
            {this.props.appInfo.info.description}
          </div>

          <div className='info-item'>
            <span className='item-label'> 应用主页：</span>
            <a href={this.props.appInfo.info.url} target='_blank'>
              {' '}
              {this.props.appInfo.info.url}
            </a>
          </div>
          <div className='info-modal-ok'>
            <Button type='ghost' onClick={this.props.close}>
              知道了
            </Button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default AppInfoModal
