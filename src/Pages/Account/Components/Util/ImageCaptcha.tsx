import React, { Component } from 'react'
import { Form, Row, Col, Input, Icon } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import UtilService from 'src/Services/UtilService'

interface IImageCaptchaProps {
  form: WrappedFormUtils
}

@observer
class ImageCaptcha extends Component<IImageCaptchaProps> {
  @observable imageCaptchaBase64: string

  constructor(props: IImageCaptchaProps) {
    super(props)
    this.updateImage()
  }

  updateImage = () => {
    UtilService.getImageCaptcha().then(v => {
      this.imageCaptchaBase64 = v
    })
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
            <img
              title='换一张'
              style={{ cursor: 'pointer' }}
              src={this.imageCaptchaBase64}
              onClick={this.updateImage}
            />
          </Col>
        </Row>
      </Form.Item>
    )
  }
}

export default ImageCaptcha
