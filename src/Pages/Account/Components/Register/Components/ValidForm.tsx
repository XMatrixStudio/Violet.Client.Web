import React, { Component } from 'react'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import { Input, Icon, Button, Row, Col } from 'antd'
import { RouteComponentProps } from 'react-router-dom'

import testCode from '@/Assets/code.png'

interface IValidFormProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
}

class ValidForm extends Component<IValidFormProps> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.history.push('/account/register/info')
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
          {getFieldDecorator('userAccount', {
            rules: [{ required: true, message: '请输入电子邮箱 / 手机号码' }]
          })(
            <Input
              prefix={<Icon type='user' className='icon-color' />}
              placeholder='电子邮箱 / 手机号码'
            />
          )}
        </Form.Item>
        <Form.Item>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator('imageCaptcha', {
                rules: [{ required: true, message: '请输入右边的验证码' }]
              })(
                <Input
                  prefix={<Icon type='check' className='icon-color' />}
                  placeholder='图形验证码'
                />
              )}
            </Col>
            <Col span={8}>
              <img src={testCode} />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请输入你收到的验证码' }]
              })(
                <Input
                  prefix={<Icon type='mail' className='icon-color' />}
                  placeholder='邮箱 / 手机验证码'
                />
              )}
            </Col>
            <Col span={8}>
              <Button type='primary' className='bg-color'>
                获取验证码
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
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

export default Form.create()(ValidForm)
