import React from 'react'
import { Form, Input, Icon, Button } from 'antd'
import { useObserver } from 'mobx-react-lite'
import {
  IFeedbackFormProps,
  useFeedbackForm
} from '../../../core/Reset/FeedbackForm'

function FeedbackForm(props: IFeedbackFormProps) {
  const { getFieldDecorator } = props.form

  const { data, handleSubmit, handleBack } = useFeedbackForm(props)

  return useObserver(() => {
    if (data.finish) {
      return (
        <div className='reset-form'>
          <p className='finish-text'>你的请求已提交，请留意后续的邮件通知。</p>
        </div>
      )
    }

    return (
      <Form onSubmit={handleSubmit} className='reset-form'>
        <Form.Item>
          <p className='input-title'>你的联系邮箱</p>
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: '请输入联系邮箱，方便我们联系你' }
            ]
          })(<Input prefix={<Icon type='mail' />} />)}
        </Form.Item>
        <Form.Item>
          <p className='input-title'>
            问题描述(说明你遇到的问题和无法登陆的账号)
          </p>
          {getFieldDecorator('message', {
            rules: [{ required: true, message: '请输入描述' }]
          })(<Input.TextArea className='detail-text-area' rows={10} />)}
        </Form.Item>
        <Form.Item className='next-item'>
          <Button type='primary' onClick={handleBack} size='large' ghost={true}>
            上一步
          </Button>
          <Button
            type='primary'
            htmlType='submit'
            className='next-btn'
            size='large'
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    )
  })
}

export default Form.create()(FeedbackForm)
