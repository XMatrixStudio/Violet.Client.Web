/**
 * 验证码模块
 */
import React, { useRef } from 'react'
import CountDownButton from './CountDownButton'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import { Input, Icon, message, Tooltip } from 'antd'
import { useObserver } from 'mobx-react-lite'
import { useLocalStore } from 'mobx-react-lite'
import { useStore } from '@/Store'
import UserService from '@/services/UserService'
import UtilService from '@/services/UtilService'

import './ValidCaptcha.less'
import { setError, errorHandler } from '@/components/UtilTool'

export interface IValidCaptchaProps {
  form: WrappedFormUtils
  type: 'register' | 'reset' | 'update'
  accountError: (err: string) => void
  defaultAccount?: (account: string) => void
}

export function useValidCaptcha(props: IValidCaptchaProps) {
  const store = useStore()

  const imageInput = useRef<Input>(null)
  const codeInput = useRef<Input>(null)

  const data = useLocalStore(() => ({
    imageBase64: '',
    showImageCaptcha: true
  }))

  React.useEffect(() => {
    hideImageCaptcha()
    updateImage()
    // 设置默认账号名
    if (
      remainTime() > 0 &&
      store.auth.account !== '' &&
      props.defaultAccount !== null
    ) {
      props.defaultAccount!(store.auth.account)
    }
    // eslint-disable-next-line
  }, [])

  const updateImage = () => {
    // props.form.resetFields(['imageCaptcha'])
    UtilService.getImageCaptcha()
      .then(v => {
        data.imageBase64 = v.data
      })
      .catch(_ => {
        message.error('无法获取验证码')
      })
  }

  const remainTime = () => {
    const time =
      new Date().getTime() - new Date(store.auth.captchaTime).getTime()
    return 90 - time / 1000
  }

  const hideImageCaptcha = () => {
    if (remainTime() < 0) {
      data.showImageCaptcha = true
      return
    }
    data.showImageCaptcha = false
    setTimeout(hideImageCaptcha, 1000)
  }

  const sendCaptcha = () => {
    props.form.validateFields(['account', 'imageCaptcha'], (err, val) => {
      if (!err) {
        store.auth.captchaTime = new Date().getTime()
        message.success('验证码发送中...')
        UserService.GetValid(val.account, val.imageCaptcha, props.type)
          .then(_ => {
            store.auth.account = val.account
            message.destroy()
            message.success('验证码已发送到' + val.account)
            hideImageCaptcha()
            updateImage()
          })
          .catch(resError => {
            updateImage()
            message.destroy()
            store.auth.captchaTime = 0
            errorHandler(resError, msg => {
              switch (msg) {
                case 'error_captcha':
                case 'not_exist_captcha':
                  setError(props.form, 'imageCaptcha', '验证码错误', '')
                  imageInput.current!.focus()
                  break
                case 'timeout_captcha':
                  setError(props.form, 'imageCaptcha', '验证码已超时', '')
                  imageInput.current!.focus()
                  break
                case 'limit_time':
                  setError(
                    props.form,
                    'imageCaptcha',
                    '发送太频繁了，请稍后重试',
                    ''
                  )
                  imageInput.current!.focus()
                  break
                case 'exist_user':
                  props.accountError('该账户已存在')
                  break
                case 'invalid_email':
                  props.accountError('无效的邮箱地址')
                  break
                case 'invalid_phone':
                  props.accountError('无效的手机号码')
                  break
                case 'exist_email':
                  props.accountError('该邮箱已被注册')
                  break
                case 'exist_phone':
                  props.accountError('该手机已被注册')
                  break
                case 'same_email':
                  props.accountError('该邮箱已被绑定')
                  break
                case 'same_phone':
                  props.accountError('该手机已被绑定')
                  break
                default:
                  message.error('发生错误:' + msg)
              }
            })
          })
      }
    })
  }
  return {
    data,
    store,
    imageInput,
    codeInput,
    updateImage,
    sendCaptcha
  }
}

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
