import React, { Component } from 'react'
import { Form, Row, Col, Input, Icon, message, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import UserService from 'src/Services/UserService'
import ImageCaptcha from './ImageCaptcha'
import ServiceTool from 'src/Services/ServiceTool'
import { inject, observer } from 'mobx-react'
import AuthStore from 'src/Store/AuthStore'
import CountDownButton from './CountDownButton'

interface IValidCaptchaProps {
  form: WrappedFormUtils
  AuthStore?: AuthStore
}

@inject('AuthStore')
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
      if (err === null) {
        console.log(this.props)
        this.props.AuthStore!.setRegisterValidTime()
        message.success('邮件发送中...')
        UserService.GetValid(val.account, val.imageCaptcha, true)
          .then(_ => {
            message.success('验证码已发送到' + val.account)
            this.refreshCaptcha()
          })
          .catch(resError => {
            this.props.AuthStore!.resetRegisterValidTime()
            ServiceTool.errorHandler(resError, msg => {
              switch (msg) {
                case 'error_captcha':
                case 'not_exist_captcha':
                  message.error('图形验证码错误')
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
              this.refreshCaptcha()
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
                rules: [
                  { required: true, message: '请输入你收到的验证码' },
                  { len: 6, message: '请输入六位验证码' }
                ]
              })(
                <Input
                  prefix={<Icon type='mail' className='icon-color' />}
                  placeholder='收到的验证码'
                />
              )}
            </Col>
            <Col span={8}>
              <CountDownButton
                lastTime={this.props.AuthStore!.state.registerValidTime}
                sendCaptcha={this.sendCaptcha}
              />
            </Col>
          </Row>
        </Form.Item>
      </>
    )
  }
}

export default ValidCaptcha
