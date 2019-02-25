import React, { Component } from 'react'
import { Icon } from 'antd'
import EditForm from './EditForm'
import { RouteComponentProps } from 'react-router'

interface IEditInfo extends RouteComponentProps<any> {}

class EditInfo extends Component<IEditInfo, any> {
  render() {
    return (
      <div>
        <p className='top-title'>
          <Icon type='edit' />
          <span>编辑个人信息</span>
        </p>
        <EditForm
          next={isEdit => {
            this.props.history.replace('/user/info')
          }}
        />
      </div>
    )
  }
}

export default EditInfo
