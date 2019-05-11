import React, { Component } from 'react'
import { Form, Checkbox, Button, Select, message } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { observer } from 'mobx-react'
import UserService from 'src/Services/UserService'
import { observable, action } from 'mobx'
import ServiceTool from 'src/Services/ServiceTool'

interface IAuthFormProps extends RouteComponentProps {
  form: WrappedFormUtils
  next: (ok: boolean) => void
  params: Type.IAuthParams
}

@observer
class AuthForm extends Component<IAuthFormProps> {
  @observable authScopes: string[] = ['base']

  @action
  componentWillMount() {
    this.props.params.scope.forEach(v => {
      if (['info', 'message'].includes(v) && !this.authScopes.includes(v)) {
        this.authScopes.push(v)
      }
    })
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        UserService.Auth({
          appId: this.props.params.client_id,
          duration: parseInt(values.authTime, 10),
          scope: values.authList
        })
          .then(res => {
            this.props.next(true)
          })
          .catch(error => {
            ServiceTool.errorHandler(error, msg => {
              message.error('授权失败, ' + msg)
            })
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='auth-form'>
        <Form.Item>
          {getFieldDecorator('authList', {
            initialValue: this.authScopes
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
              {this.authScopes.includes('info') && (
                <Checkbox
                  style={{ width: '100%', marginBottom: '8px' }}
                  value='info'
                >
                  获取您的公开个人信息
                </Checkbox>
              )}
              {this.authScopes.includes('message') && (
                <Checkbox style={{ width: '100%' }} value='message'>
                  向您发送通知
                </Checkbox>
              )}
            </Checkbox.Group>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('authTime', {
            initialValue: '15'
          })(
            <Select>
              <Select.Option value='0'>仅单次授权</Select.Option>
              <Select.Option value='7'>7天内自动授权</Select.Option>
              <Select.Option value='15'>15天内自动授权</Select.Option>
              <Select.Option value='30'>30天内自动授权</Select.Option>
              <Select.Option value='90'>3个月内自动授权</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Button
          className='auth-btn'
          type='primary'
          block={true}
          htmlType='submit'
        >
          授权
        </Button>
        <Button
          className='auth-second-btn'
          type='dashed'
          block={true}
          onClick={() => {
            UserService.Logout()
            this.props.history.push('/account' + this.props.location.search)
          }}
        >
          切换账号
        </Button>
      </Form>
    )
  }
}

export default withRouter(Form.create()(AuthForm))
