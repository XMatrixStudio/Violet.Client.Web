import React, { Component } from 'react'
import { Form, Input, Icon, Button, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import NewPassword from '../../../../../../Components/NewPassword'
import UserService from 'src/Services/UserService'
import ServiceTool from 'src/Services/ServiceTool'

interface IInfoFormProps {
  form: WrappedFormUtils
  next: () => void
  id: string
}

class InfoForm extends Component<IInfoFormProps, any> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // {userName: "zhenly", nickName: "ZhenlyChen", password: "123456", passwordAgain: "123456"}
        UserService.Register(values.userName, values.nickName, values.password)
          .then(_ => {
            this.props.next()
          })
          .catch(error => {
            ServiceTool.errorHandler(error, msg => {
              switch (msg) {
                case 'not_exist_email':
                  message.error('用户邮箱未验证，无法完成注册')
                  break
                case 'reserved_name':
                case 'exist_name':
                  message.error('用户名已存在')
                  this.props.form.resetFields(['userName'])
                  break
                default:
                  message.error('发生错误：' + msg)
              }
            })
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='info-form'>
        <Form.Item>
          <Icon
            type='check'
            className='icon-color'
            style={{ fontSize: '18px' }}
          />
          <span className='ant-form-text' style={{ marginLeft: '10px' }}>
            {this.props.id}
          </span>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [
              { required: true, message: '请输入用户名' },
              {
                pattern: /^[a-zA-Z0-9_-]*$/,
                message: '用户名由字母、数字、下划线或横杠组成'
              },
              { pattern: /^[a-zA-Z].*$/, message: '用户名必须由字母开头' },
              { min: 3, message: '用户名不能小于3个字符' },
              { max: 24, message: '用户名不能大于24个字符' }
            ]
          })(
            <Input
              prefix={<Icon type='user' className='icon-color' />}
              placeholder='唯一用户名'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('nickName', {
            rules: [
              { required: true, message: '请输入昵称' },
              { max: 24, message: '昵称不能大于24个字符' }
            ]
          })(
            <Input
              prefix={<Icon type='robot' className='icon-color' />}
              placeholder='昵称'
            />
          )}
        </Form.Item>
        <NewPassword form={this.props.form} />
        <Form.Item className='last-item'>
          <Button
            type='primary'
            htmlType='submit'
            className='register-btn'
            block={true}
          >
            确定
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(InfoForm)
