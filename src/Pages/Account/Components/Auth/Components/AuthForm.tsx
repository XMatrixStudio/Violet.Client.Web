import React, { Component } from 'react'
import { Form, Checkbox, Button } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import RouterUtil from '../../Util/RouterUtil'
import { inject, observer } from 'mobx-react'
import AuthStore from 'src/Store/AuthStore'

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
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: '24px' }}>
        <Form.Item>
          {getFieldDecorator('authList', {
            initialValue: ['base', 'info', 'message']
          })(
            <Checkbox.Group style={{ textAlign: 'left' }}>
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
            this.props.AuthStore!.signOut()
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
