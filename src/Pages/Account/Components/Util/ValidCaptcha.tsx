import React, { Component } from 'react'
import { Form, Row, Col, Input, Icon, Button, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import UserService from 'src/Services/UserService'

interface IValidCaptchaProps {
  form: WrappedFormUtils
}

class ValidCaptcha extends Component<IValidCaptchaProps> {
  sendCaptcha = () => {
    this.props.form.validateFields(['account', 'imageCaptcha'], (err, val) => {
      console.log(err, val)
      if (err === null) {
        UserService.GetValid(val.account, val.imageCaptcha, true)
          .then(v => {
            console.log(v)
            message.success('验证码已发送到' + val.account)
          })
          .catch(res => {
            console.log(res.response)
          })
      }
    })
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
                placeholder='收到的验证码'
              />
            )}
          </Col>
          <Col span={8}>
            <Button
              type='primary'
              className='bg-color'
              onClick={this.sendCaptcha}
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
