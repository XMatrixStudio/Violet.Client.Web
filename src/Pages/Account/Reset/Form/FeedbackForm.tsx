import * as React from 'react'
import { Form, Input, Icon, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import useRouter from 'use-react-router'
import { useLocalStore, useObserver } from 'mobx-react-lite'

export interface IFeedbackFormProps {
  form: WrappedFormUtils
}

function FeedbackForm(props: IFeedbackFormProps) {
  const { getFieldDecorator } = props.form

  const { history } = useRouter()

  const data = useLocalStore(() => ({
    finish: false
  }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        data.finish = true
      }
    })
  }

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
          })(<Input prefix={<Icon type='user' className='icon-color' />} />)}
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
          <Button
            type='primary'
            onClick={() => {
              history.replace('/account/reset')
            }}
            size='large'
            ghost={true}
          >
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

export default Form.create<IFeedbackFormProps>()(FeedbackForm)
