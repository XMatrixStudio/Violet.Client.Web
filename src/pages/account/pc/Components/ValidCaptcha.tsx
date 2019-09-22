/**
 * 验证码模块
 */
import React from 'react'
import CountDownButton from './CountDownButton'
import Form from 'antd/lib/form/Form'
import { Input, Icon, Tooltip } from 'antd'
import { useObserver } from 'mobx-react-lite'
import {
  IValidCaptchaProps,
  useValidCaptcha
} from '../../core/Components/ValidCaptcha'

import './ValidCaptcha.less'

function ValidCaptcha(props: IValidCaptchaProps) {
  const { getFieldDecorator } = props.form
  const {
    data,
    store,
    imageInput,
    codeInput,
    updateImage,
    sendCaptcha
  } = useValidCaptcha(props)

  return useObserver(() => (
    <div className='image-captcha-form'>
      <Form.Item style={{ display: data.showImageCaptcha ? 'block' : 'none' }}>
        <p className='input-title'>图形验证码</p>
        <div className='two-layout-input'>
          <div className='input-left'>
            {getFieldDecorator('imageCaptcha', {
              rules: [
                { required: true, message: '请输入右边的验证码' },
                { pattern: /^[0-9]{0,4}$/, message: '请输入4位数字验证码' }
              ]
            })(<Input ref={imageInput} prefix={<Icon type='check' />} />)}
          </div>
          <div className='input-right'>
            <Tooltip title='换一张'>
              <img
                alt='验证码'
                style={{ cursor: 'pointer' }}
                src={data.imageBase64}
                onClick={updateImage}
              />
            </Tooltip>
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <p className='input-title'>收到的验证码</p>
        <div className='two-layout-input'>
          <div className='input-left'>
            {getFieldDecorator('captcha', {
              rules: [
                { required: true, message: '请输入你收到的验证码' },
                { pattern: /^[0-9]{0,6}$/, message: '请输入六位验证码' }
              ]
            })(<Input ref={codeInput} prefix={<Icon type='mail' />} />)}
          </div>
          <div className='input-right'>
            <CountDownButton
              lastTime={store.auth.captchaTime}
              handleSend={sendCaptcha}
            />
          </div>
        </div>
      </Form.Item>
    </div>
  ))
}

export default ValidCaptcha
