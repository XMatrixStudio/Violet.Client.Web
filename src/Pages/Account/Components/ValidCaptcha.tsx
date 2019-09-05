/**
 * 验证码模块
 */
import * as React from 'react'
import CountDownButton from './CountDownButton'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import { Input, Icon, message, Tooltip } from 'antd'
import { useObserver } from 'mobx-react-lite'
import UserService from '../../../services/UserService'
import ServiceTool from '../../../services/ServiceTool'
import { useLocalStore } from 'mobx-react-lite'
import UtilService from '../../../services/UtilService'
import './ValidCaptcha.less'
import { useStore } from '../../../Store'

export interface IValidCaptchaProps {
  form: WrappedFormUtils
  type: 'register' | 'reset' | 'update'
  defaultAccount?: (account: string) => void
  error: string
  accountError: (error: string) => void
}

function ValidCaptcha(props: IValidCaptchaProps) {
  const { getFieldDecorator } = props.form
  
  const store = useStore()

  const data = useLocalStore(() => ({
    imageBase64: '',
    showImageCaptcha: true,
    imageError: '',
    codeError: ''
  }))

  React.useEffect(() => {
    hideImageCaptcha()
    updateImage()
    setDefaultAccount()
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    data.codeError = props.error
    // eslint-disable-next-line
  }, [props.error])

  const updateImage = () => {
    props.form.resetFields(['imageCaptcha'])
    UtilService.getImageCaptcha()
      .then(v => {
        data.imageBase64 = v.data
      })
      .catch(_ => {
        message.error('无法获取验证码')
      })
  }

  const setDefaultAccount = () => {
    if (
      remainTime() > 0 &&
      store.auth.account !== '' &&
      props.defaultAccount !== null
    ) {
      props.defaultAccount!(store.auth.account)
    }
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
            message.destroy()
            store.auth.captchaTime = 0
            ServiceTool.errorHandler(resError, msg => {
              switch (msg) {
                case 'error_captcha':
                case 'not_exist_captcha':
                case 'timeout_captcha':
                  data.imageError = msg
                  break
                case 'exist_user':
                case 'invalid_email':
                case 'exist_email':
                case 'invalid_phone':
                case 'exist_phone':
                case 'same_email':
                case 'same_phone':
                  props.accountError(msg)
                  break
                case 'limit_time':
                  data.codeError = msg
                  break
                default:
                  message.error('发生错误:' + msg)
              }
              updateImage()
            })
          })
      } else {
        if (err.account) {
          props.accountError('请输入电子邮箱/手机号码')
        }
        if (err.imageCaptcha) {
          data.imageError = '请输入右侧图形验证码'
        }
      }
    })
  }

  const codeError = (error: string) => {
    switch (error) {
      case 'invalid_code':
      case 'not_exist_code':
      case 'error_code':
        return '验证码错误'
      case 'timeout_code':
        return '验证码已过期，请重新获取'
      case 'limit_time':
        return '发送太频繁了，请稍后重试'
      default:
        return error
    }
  }

  const imageError = (error: string) => {
    switch (error) {
      case 'error_captcha':
      case 'not_exist_captcha':
        return '图形验证码错误'
      case 'timeout_captcha':
        return '验证码已超时'
      default:
        return error
    }
  }

  return useObserver(() => (
    <div className='image-captcha-form'>
      <Form.Item
        validateStatus={data.imageError === '' ? 'success' : 'error'}
        help={imageError(data.imageError)}
        style={{ display: data.showImageCaptcha ? 'block' : 'none' }}
      >
        <p className='input-title'>图形验证码</p>
        <div className='two-layout-input'>
          <div className='input-left'>
            {getFieldDecorator('imageCaptcha', {
              rules: [
                { required: true, message: '请输入右边的验证码' },
                { pattern: /^[0-9]{4}$/, message: '请输入4位数字验证码' }
              ]
            })(
              <Input
                prefix={<Icon type='check' />}
                onChange={() => {
                  data.imageError = ''
                }}
              />
            )}
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
      <Form.Item
        validateStatus={data.codeError === '' ? 'success' : 'error'}
        help={codeError(data.codeError)}
      >
        <p className='input-title'>收到的验证码</p>
        <div className='two-layout-input'>
          <div className='input-left'>
            {getFieldDecorator('captcha', {
              rules: [
                { required: true, message: '请输入你收到的验证码' },
                { len: 6, message: '请输入六位验证码' }
              ]
            })(
              <Input
                onChange={() => {
                  data.codeError = ''
                }}
                prefix={<Icon type='mail' />}
              />
            )}
          </div>
          <div className='input-right'>
            <CountDownButton
              lastTime={store.auth.captchaTime}
              sendCaptcha={sendCaptcha}
            />
          </div>
        </div>
      </Form.Item>
    </div>
  ))
}

export default ValidCaptcha
