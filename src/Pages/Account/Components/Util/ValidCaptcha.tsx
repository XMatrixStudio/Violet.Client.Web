import React, { Component } from 'react'
import { Form, Row, Col, Input, Icon, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import UserService from 'src/Services/UserService'
import ImageCaptcha from './ImageCaptcha'
import ServiceTool from 'src/Services/ServiceTool'
import { inject, observer } from 'mobx-react'
import AuthStore from 'src/Store/AuthStore'
import CountDownButton from './CountDownButton'
import { observable } from 'mobx'

interface IValidCaptchaProps {
  form: WrappedFormUtils
  AuthStore?: AuthStore
  isNew?: boolean
}

@inject('AuthStore')
@observer
class ValidCaptcha extends Component<IValidCaptchaProps> {
  imageCaptcha: ImageCaptcha | null
  @observable showImage: boolean

  constructor(props: IValidCaptchaProps) {
    super(props)
    this.showImage = true
  }

  refreshCaptcha = () => {
    if (this.imageCaptcha) {
      this.imageCaptcha.updateImage()
    }
  }

  remainTime = () => {
    const time =
      new Date().getTime() -
      new Date(this.props.AuthStore!.state.registerValidTime).getTime()
    return 60 - time / 1000
  }

  hideImageCaptcha = () => {
    if (this.remainTime() < 0) {
      this.showImage = true
      return
    }
    this.showImage = false
    setTimeout(this.hideImageCaptcha, 1000)
  }

  sendCaptcha = () => {
    this.props.form.validateFields(['account', 'imageCaptcha'], (err, val) => {
      if (err === null) {
        this.props.AuthStore!.setRegisterValidTime()
        this.hideImageCaptcha()
        message.success('验证码发送中...')
        UserService.GetValid(
          val.account,
          val.imageCaptcha,
          this.props.isNew === true
        )
          .then(_ => {
            message.destroy()
            message.success('验证码已发送到' + val.account)
            this.refreshCaptcha()
          })
          .catch(resError => {
            message.destroy()
            this.props.AuthStore!.resetRegisterValidTime()
            ServiceTool.errorHandler(resError, msg => {
              switch (msg) {
                case 'error_captcha':
                case 'not_exist_captcha':
                  message.error('图形验证码错误')
                  break
                case 'timeout_captcha':
                  message.error('验证码已超时')
                  break
                case 'invalid_email':
                  message.error('无效的邮箱地址')
                  break
                case 'exist_email':
                  message.error('该邮箱已被注册')
                  break
                case 'limit_time':
                  message.error('发送太频繁了，请稍后重试')
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
        <div style={{ display: this.showImage ? 'block' : 'none' }}>
          <ImageCaptcha
            form={this.props.form}
            ref={inst => (this.imageCaptcha = inst)}
          />
        </div>
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
