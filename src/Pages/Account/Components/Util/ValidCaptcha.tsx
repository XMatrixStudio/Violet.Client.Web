import React, { Component } from 'react'
import { Form, Row, Col, Input, Icon, Button, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import UserService from 'src/Services/UserService'
import ImageCaptcha from './ImageCaptcha'
import ServiceTool from 'src/Services/ServiceTool'
import { inject, observer } from 'mobx-react'
import AuthStore from 'src/Store/AuthStore'

interface IValidCaptchaProps {
  form: WrappedFormUtils
  authStore?: AuthStore
}

@inject('auth')
@observer
class ValidCaptcha extends Component<IValidCaptchaProps> {
  imageCaptcha: ImageCaptcha | null

  refreshCaptcha = () => {
    if (this.imageCaptcha) {
      this.imageCaptcha.updateImage()
    }
  }

  sendCaptcha = () => {
    this.props.form.validateFields(['account', 'imageCaptcha'], (err, val) => {
      console.log(err, val)
      if (err === null) {
        UserService.GetValid(val.account, val.imageCaptcha, true)
          .then(_ => {
            message.success('验证码已发送到' + val.account)
            this.props.authStore!.setRegisterValidTime()
            this.refreshCaptcha()
          })
          .catch(resError => {
            ServiceTool.errorHandler(resError, msg => {
              switch (msg) {
                case 'error_captcha':
                case 'not_exist_captcha':
                  message.error('验证码错误')
                  this.refreshCaptcha()
                  break
                case 'invalid_email':
                  message.error('无效的邮箱地址')
                  break
                case 'exist_email':
                  message.error('该邮箱已被注册')
                  break
                default:
                  message.error('发生错误:' + msg)
              }
            })
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <>
        <ImageCaptcha
          form={this.props.form}
          ref={inst => (this.imageCaptcha = inst)}
        />
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
      </>
    )
  }
}

export default ValidCaptcha
