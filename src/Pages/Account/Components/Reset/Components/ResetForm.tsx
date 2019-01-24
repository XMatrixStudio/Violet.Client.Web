import React, { Component } from 'react'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import { Input, Icon, Button, Row, Col } from 'antd'

import testCode from '@/Assets/code.png'

interface IResetFormProps {
  form: WrappedFormUtils
  next: (id?: string) => void
}

class ResetForm extends Component<IResetFormProps> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.next('a@zhenly.cn')
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='normal-form'>
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
        <Form.Item className='last-item'>
          <Button
            type='primary'
            htmlType='submit'
            className='reset-btn'
            block={true}
          >
            确定
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(ResetForm)
