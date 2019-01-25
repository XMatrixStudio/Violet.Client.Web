import React, { Component } from 'react'
import { Form, Row, Col, Input, Icon } from 'antd'
import testCode from '@/Assets/code.png'
import { WrappedFormUtils } from 'antd/lib/form/Form'

interface IImageCaptchaProps {
  form: WrappedFormUtils
}

class ImageCaptcha extends Component<IImageCaptchaProps> {
  updateImage = () => {
    console.log('update')
    // todo 获取新的验证码
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
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
            <img src={testCode} onClick={this.updateImage} />
          </Col>
        </Row>
      </Form.Item>
    )
  }
}

export default ImageCaptcha
