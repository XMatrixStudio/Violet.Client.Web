import * as React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'

interface ILoginFormProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
}

class NormalLoginForm extends React.Component<ILoginFormProps, any> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.history.push('/account/auth')
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名 / 手机 / 邮箱' }]
          })(
            <Input
              prefix={<Icon type='user' className='icon-color' />}
              placeholder='用户名 / 手机 / 邮箱'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码' }]
          })(
            <Input
              prefix={<Icon type='key' className='icon-color' />}
              type='password'
              placeholder='密码'
            />
          )}
        </Form.Item>
        <Form.Item className='last-item'>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox style={{ float: 'left' }}>记住我</Checkbox>)}
          <Link style={{ float: 'right' }} to='/account/reset'>
            忘记密码
          </Link>
          <Button
            type='primary'
            htmlType='submit'
            className='login-btn'
            block={true}
          >
            登陆
          </Button>
          <Link style={{ display: 'block' }} to='/account/register'>
            现在注册
          </Link>
        </Form.Item>
      </Form>
    )
  }
}

export default withRouter(Form.create()(NormalLoginForm))
