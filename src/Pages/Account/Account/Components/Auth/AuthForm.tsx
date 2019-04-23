import React, { Component } from 'react'
import { Form, Checkbox, Button, Select } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import RouterUtil from '../Util/RouterUtil'
import { inject, observer } from 'mobx-react'
import AuthStore from 'src/Store/AuthStore'
import UserService from 'src/Services/UserService'

interface IAuthFormProps extends RouteComponentProps {
  form: WrappedFormUtils
  AuthStore?: AuthStore
}

@inject('AuthStore')
@observer
class AuthForm extends Component<IAuthFormProps> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        window.location.href = '/user'
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='auth-form'>
        <Form.Item>
          {getFieldDecorator('authList', {
            initialValue: ['base', 'info', 'message']
          })(
            <Checkbox.Group className='checkbox-group'>
              <Checkbox
                style={{
                  width: '100%',
                  marginLeft: '8px',
                  marginBottom: '8px'
                }}
                value='base'
                disabled={true}
              >
                获取您的昵称、头像、性别
              </Checkbox>
              <Checkbox
                style={{ width: '100%', marginBottom: '8px' }}
                value='info'
              >
                获取您的公开个人信息
              </Checkbox>
              <Checkbox style={{ width: '100%' }} value='message'>
                向您发送通知
              </Checkbox>
            </Checkbox.Group>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('authTime', {
            initialValue: 'long'
          })(
            <Select defaultValue='long'>
              <Select.Option value='single'>仅单次授权</Select.Option>
              <Select.Option value='short'>7天内自动授权</Select.Option>
              <Select.Option value='long'>15天内自动授权</Select.Option>
              <Select.Option value='month'>30天内自动授权</Select.Option>
              <Select.Option value='season'>3个月内自动授权</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Button
          className='auth-btn'
          type='primary'
          block={true}
          htmlType='submit'
          onClick={() => {
            window.location.href = '/user'
          }}
        >
          授权
        </Button>
        <Button
          className='auth-second-btn'
          type='dashed'
          block={true}
          onClick={() => {
            this.props.AuthStore!.signOut()
            UserService.Logout()
            RouterUtil.GoBackAccount(this.props.history, this.props.location)
          }}
        >
          切换账号
        </Button>
      </Form>
    )
  }
}

export default withRouter(Form.create()(AuthForm))
