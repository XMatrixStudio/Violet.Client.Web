import React, { Component } from 'react'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import NewPassword from 'src/Components/NewPassword'
import UserService from 'src/Services/UserService'
import ServiceTool from 'src/Services/ServiceTool'
import { inject, observer } from 'mobx-react'
import UIStore from 'src/Store/UIStore'

interface IEditPasswordProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
  finish: (isEdit: boolean) => void
  UIStore?: UIStore
}

@inject('UIStore')
@observer
class EditPassword extends Component<IEditPasswordProps, any> {
  constructor(props: IEditPasswordProps) {
    super(props)
  }

  componentWillMount() {
    document.title = '修改密码 | Violet'
    this.props.UIStore!.setTitle(
      <>
        <Link key='link' to='/user/secure'>
          账户安全
        </Link>
        <span key='more'> > 修改密码</span>
      </>,
      '定期修改密码使得你的账号更安全'
    )
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        UserService.UpdateInfo({
          secure: {
            old_password: values.oldPassword,
            new_password: values.password
          }
        })
          .then(_ => {
            message.success('修改密码成功')
            this.props.finish(true)
            this.props.history.goBack()
          })
          .catch(error => {
            ServiceTool.errorHandler(error, msg => {
              switch (msg) {
                case 'same_password':
                  message.error('新密码不能与旧密码相同')
                  break
                case 'error_password':
                  message.error('旧密码错误')
                  this.props.form.resetFields(['oldPassword'])
                  this.props.form.validateFieldsAndScroll(['oldPassword'])
                  break
                default:
                  message.error('发生错误' + msg)
              }
            })
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='form-layout'>
        <Form className='my-form' onSubmit={this.handleSubmit}>
          <Form.Item className='hits-text'>
            上次修改密码： <strong>无数据</strong>
          </Form.Item>
          <Form.Item label='旧密码'>
            {getFieldDecorator('oldPassword', {
              rules: [
                {
                  required: true,
                  message: '请输入旧密码'
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <NewPassword form={this.props.form} label={true} />
          <Button type='primary' htmlType='submit'>
            修改密码
          </Button>
          <Button
            className='back-btn'
            onClick={() => {
              this.props.history.goBack()
            }}
          >
            取消
          </Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(Form.create()(EditPassword))
