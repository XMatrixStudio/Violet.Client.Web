import React, { Component } from 'react'
import { Form, Input, Icon, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import NewPassword from '../../Util/NewPassword'

interface IInfoFormProps {
  form: WrappedFormUtils
  next: () => void
  id: string
}

class InfoForm extends Component<IInfoFormProps, any> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.next()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='info-form'>
        <Form.Item>
          <Icon
            type='check'
            className='icon-color'
            style={{ fontSize: '18px' }}
          />
          <span className='ant-form-text' style={{ marginLeft: '10px' }}>
            {this.props.id}
          </span>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }]
          })(
            <Input
              prefix={<Icon type='user' className='icon-color' />}
              placeholder='唯一用户名'
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('nickName', {
            rules: [{ required: true, message: '请输入昵称' }]
          })(
            <Input
              prefix={<Icon type='robot' className='icon-color' />}
              placeholder='昵称'
            />
          )}
        </Form.Item>
        <NewPassword form={this.props.form} />
        <Form.Item className='last-item'>
          <Button
            type='primary'
            htmlType='submit'
            className='register-btn'
            block={true}
          >
            确定
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(InfoForm)