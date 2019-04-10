import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import './EditInfo.less'
import { Form, Icon, Input, Radio, DatePicker, Button, message } from 'antd'
import moment from 'moment'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import UserService from 'src/Services/UserService'
import ServiceTool from 'src/Services/ServiceTool'

interface IEditInfo extends RouteComponentProps<any> {
  next: (isEdit: boolean) => void
  userInfo: User.GET.ResponseBody
  form: WrappedFormUtils
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

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const newInfo: User.PATCH.RequestBody = {
          info: {
            nickname: values.nickName,
            email: values.email,
            bio: values.userBio,
            gender: values.gender,
            location: values.location,
            phone: values.phone,
            url: values.url
          }
        }
        if (values.birthday) {
          newInfo.info!.birthday = values.birthday.format('YYYY-MM-DD')
        }
        UserService.UpdateInfo(newInfo)
          .then(_ => {
            message.success('修改信息成功')
            this.props.next(true)
          })
          .catch(error => {
            ServiceTool.errorHandler(error, msg => {
              message.error('发生错误' + msg)
            })
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { userInfo } = this.props
    return (
      <div className='edit-layout base-card-box'>
        <div className='form-title'>
          修改个人信息
          <Icon
            type='rollback'
            className='btn-back'
            onClick={() => {
              this.props.next(false)
            }}
          />
        </div>

        <Form className='edit-form' onSubmit={this.handleSubmit}>
          <Form.Item label='昵称'>
            {getFieldDecorator('nickName', {
              rules: [
                {
                  required: true,
                  message: '请输入昵称'
                }
              ],
              initialValue: userInfo.info.nickname
            })(<Input />)}
          </Form.Item>
          <Form.Item label='个人简介'>
            {getFieldDecorator('userBio', {
              initialValue: userInfo.info.bio || ''
            })(<Input />)}
          </Form.Item>
          <Form.Item label='性别'>
            {getFieldDecorator('gender', {
              initialValue: userInfo.info.gender || 0
            })(
              <Radio.Group>
                <Radio value={1}>
                  <Icon type='man' className='gender-icon gender-man' />男
                </Radio>
                <Radio value={2}>
                  <Icon type='woman' className='gender-icon gender-woman' />女
                </Radio>
                <Radio value={0}>
                  <Icon type='robot' className='gender-icon gender-other' />
                  其他
                </Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label='联系邮箱'>
            {getFieldDecorator('email', {
              rules: [{ type: 'email', message: '请输入合法的邮箱' }],
              initialValue: userInfo.info.email || ''
            })(<Input />)}
          </Form.Item>
          <Form.Item label='联系电话'>
            {getFieldDecorator('phone', {
              initialValue: userInfo.info.phone || ''
            })(<Input />)}
          </Form.Item>
          <Form.Item label='地区'>
            {getFieldDecorator('location', {
              initialValue: userInfo.info.location || ''
            })(<Input />)}
          </Form.Item>
          <Form.Item label='个人主页'>
            {getFieldDecorator('url', {
              initialValue: userInfo.info.url || ''
            })(<Input />)}
          </Form.Item>
          <Form.Item label='生日'>
            {getFieldDecorator('birthday', {
              initialValue: userInfo.info.birthday
                ? moment(userInfo.info.birthday)
                : null
            })(<DatePicker placeholder='选择日期' />)}
          </Form.Item>
          <Button htmlType='submit' type='primary'>
            保存
          </Button>
          <Button
            style={{ marginLeft: '20px' }}
            onClick={() => {
              this.props.next(false)
            }}
          >
            取消
          </Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(Form.create()(EditInfo))
