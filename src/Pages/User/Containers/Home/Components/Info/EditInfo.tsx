import React, { Component } from 'react'
import EditForm from './EditForm'
import { RouteComponentProps, withRouter } from 'react-router'
interface IEditInfo extends RouteComponentProps<any> {
  updateData: () => void
  userInfo: User.GET.ResponseBody
}

class EditInfo extends Component<IEditInfo, any> {
  infoComplete = () => {
    let val = 0
    const { info } = this.props.userInfo
    ;['bio', 'email', 'location', 'phone', 'url'].map(value => {
      if (info[value] !== undefined && info[value] !== '') {
        val++
      }
    })
    if (info.birthday !== undefined) {
      val++
    }
    if (info.gender !== undefined) {
      val++
    }
    return ((val / 7.0) * 100).toFixed(0)
  }

  componentDidMount() {
    document.title = '编辑个人信息 | Violet'
  }

  render() {
    return (
      <div className='edit-layout'>
        <div className='top-layout'>
          <div className='top-text'>
            <p className='title'>编辑个人信息</p>
            <p className='sub-title'>完善的个人信息可以帮助更多人找到你</p>
          </div>
          <div className='right-text'>
            信息完善度: <strong>{this.infoComplete()}%</strong>
          </div>
        </div>
        <EditForm
          next={isEdit => {
            if (isEdit) {
              this.props.updateData()
            }
            this.props.history.goBack()
          }}
          userInfo={this.props.userInfo}
        />
      </div>
    )
  }
}

export default withRouter(EditInfo)
