import React, { Component } from 'react'
import EditForm from './EditForm'
import { RouteComponentProps } from 'react-router'

interface IEditInfo extends RouteComponentProps<any> {}

class EditInfo extends Component<IEditInfo, any> {
  render() {
    return (
      <div className='edit-layout'>
        <div className='top-layout'>
          <div className='top-text'>
            <p className='title'>编辑个人信息</p>
            <p className='sub-title'>完善的个人信息可以帮助更多人找到你</p>
          </div>
          <div className='right-text'>
            信息完善度: <strong>80%</strong>
          </div>
        </div>
        <EditForm
          next={isEdit => {
            this.props.history.goBack()
          }}
        />
      </div>
    )
  }
}

export default EditInfo
