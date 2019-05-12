import React, { Component } from 'react'
import { Form, Input, Icon, message, Tooltip } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import UtilService from 'src/Services/UtilService'
import './InputWithBtn.less'

interface IImageCaptchaProps {
  form: WrappedFormUtils
  label?: boolean
}

@observer
class ImageCaptcha extends Component<IImageCaptchaProps> {
  @observable imageCaptchaBase64: string

  constructor(props: IImageCaptchaProps) {
    super(props)
    this.updateImage()
  }

  updateImage = () => {
    this.props.form.resetFields(['imageCaptcha'])
    UtilService.getImageCaptcha()
      .then(v => {
        this.imageCaptchaBase64 = v.data
      })
      .catch(_ => {
        message.error('无法获取验证码')
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form.Item label={this.props.label === true ? '图形验证码' : null}>
        <div className='input-with-btn'>
          <div className='input-left'>
            {getFieldDecorator('imageCaptcha', {
              rules: [
                { required: true, message: '请输入右边的验证码' },
                { pattern: /^[0-9]{4}$/, message: '请输入4位数字验证码' }
              ]
            })(
              <Input
                prefix={
                  this.props.label === true ? null : (
                    <Icon type='check' className='icon-color' />
                  )
                }
                placeholder={this.props.label === true ? '' : '图形验证码'}
              />
            )}
          </div>
          <div className='btn-right'>
            <Tooltip title='换一张'>
              <img
                style={{ cursor: 'pointer' }}
                src={this.imageCaptchaBase64}
                onClick={this.updateImage}
              />
            </Tooltip>
          </div>
        </div>
      </Form.Item>
    )
  }
}

export default ImageCaptcha
