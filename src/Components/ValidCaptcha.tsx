import React, { Component } from 'react'
import { Form, Row, Col, Input, Icon, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import UserService from 'src/Services/UserService'
import ImageCaptcha from '../Pages/Account/Account/Components/Util/ImageCaptcha'
import ServiceTool from 'src/Services/ServiceTool'
import { inject, observer } from 'mobx-react'
import AuthStore from 'src/Store/AuthStore'
import CountDownButton from './CountDownButton'
import { observable } from 'mobx'

interface IValidCaptchaProps {
  form: WrappedFormUtils
  AuthStore?: AuthStore
  type: 'register' | 'reset' | 'update'
  label?: boolean
}

@inject('AuthStore')
@observer
class ValidCaptcha extends Component<IValidCaptchaProps> {
  imageCaptcha: ImageCaptcha | null
  @observable showImageCaptcha = true

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
      this.showImageCaptcha = true
      return
    }
    this.showImageCaptcha = false
    setTimeout(this.hideImageCaptcha, 1000)
  }

  sendCaptcha = () => {
    this.props.form.validateFields(['account', 'imageCaptcha'], (err, val) => {
      if (!err) {
        this.props.AuthStore!.setRegisterValidTime()
        this.hideImageCaptcha()
        message.success('验证码发送中...')
        UserService.GetValid(val.account, val.imageCaptcha, this.props.type)
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
                case 'exist_user':
                  message.error('该账户已存在')
                  break
                case 'invalid_email':
                  message.error('无效的邮箱地址')
                  break
                case 'exist_email':
                  message.error('该邮箱已被注册')
                  break
                case 'invalid_phone':
                  message.error('无效的手机号码')
                  break
                case 'exist_phone':
                  message.error('该手机已被注册')
                  break
                case 'same_email':
                  message.error('当前邮箱已绑定')
                  break
                case 'same_phone':
                  message.error('当前手机已绑定')
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
        <div style={{ display: this.showImageCaptcha ? 'block' : 'none' }}>
          <ImageCaptcha
            form={this.props.form}
            ref={inst => (this.imageCaptcha = inst)}
            label={this.props.label}
          />
        </div>
        <Form.Item label={this.props.label === true ? '验证码' : null}>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator('captcha', {
                rules: [
                  { required: true, message: '请输入你收到的验证码' },
                  { len: 6, message: '请输入六位验证码' }
                ]
              })(
                <Input
                  prefix={
                    this.props.label === true ? null : (
                      <Icon type='mail' className='icon-color' />
                    )
                  }
                  placeholder={this.props.label === true ? '' : '收到的验证码'}
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
