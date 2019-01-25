import React, { Component } from 'react'
import { Form, Row, Col, Input, Icon, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'

interface IValidCaptchaProps {
  form: WrappedFormUtils
}

class ValidCaptcha extends Component<IValidCaptchaProps> {
  getCaptcha = () => {
    console.log('update')
    // todo 发送验证码
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
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
            <Button
              type='primary'
              className='bg-color'
              onClick={this.getCaptcha}
            >
              获取验证码
            </Button>
          </Col>
        </Row>
      </Form.Item>
    )
  }
}

export default ValidCaptcha
