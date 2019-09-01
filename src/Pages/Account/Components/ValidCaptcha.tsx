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
}

function ValidCaptcha(props: IValidCaptchaProps) {
  const { getFieldDecorator } = props.form

  const store = useStore()

  const data = useLocalStore(() => ({
    imageBase64: '',
    showImageCaptcha: true
  }))

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

  React.useEffect(() => {
    hideImageCaptcha()
    updateImage()
    if (
      remainTime() > 0 &&
      store.auth.account !== '' &&
      props.defaultAccount !== null
    ) {
      props.defaultAccount!(store.auth.account)
    }
  }, [])

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
        hideImageCaptcha()
        message.success('验证码发送中...')
        UserService.GetValid(val.account, val.imageCaptcha, props.type)
          .then(_ => {
            store.auth.account = val.account
            message.destroy()
            message.success('验证码已发送到' + val.account)
            updateImage()
          })
          .catch(resError => {
            message.destroy()
            store.auth.captchaTime = 0
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
              updateImage()
            })
          })
      }
    })
  }

  return useObserver(() => (
    <div className='image-captcha-form'>
      <Form.Item style={{ display: data.showImageCaptcha ? 'block' : 'none' }}>
        <p className='input-title'>图形验证码</p>
        <div className='two-layout-input'>
          <div className='input-left'>
            {getFieldDecorator('imageCaptcha', {
              rules: [
                { required: true, message: '请输入右边的验证码' },
                { pattern: /^[0-9]{4}$/, message: '请输入4位数字验证码' }
              ]
            })(<Input prefix={<Icon type='check' />} />)}
          </div>
          <div className='input-right'>
            <Tooltip title='换一张'>
              <img
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
                { len: 6, message: '请输入六位验证码' }
              ]
            })(<Input prefix={<Icon type='mail' className='icon-color' />} />)}
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
