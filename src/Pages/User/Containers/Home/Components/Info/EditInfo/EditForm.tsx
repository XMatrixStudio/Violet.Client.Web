import React, { Component } from 'react'
import { Form, Input, Button, Icon, Radio, DatePicker } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import './EditForm.less'

interface IEditFormProps {
  form: WrappedFormUtils
  next: (isEdit: boolean) => void
}

class EditForm extends Component<IEditFormProps, any> {
  EmailId = 0
  PhoneId = 0
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.birthday !== undefined) {
          values.birthday = values.birthday.format('YYYY-MM-DD')
        }
        // this.props.next(true)
        console.log('Received values of form: ', values)
      }
    })
  }

  removeEmail = (k: string) => {
    const { form } = this.props
    const keys = form.getFieldValue('emailKeys')
    if (keys.length === 1) {
      return
    }
    form.setFieldsValue({
      emailKeys: keys.filter((key: string) => key !== k)
    })
  }

  addEmail = () => {
    const { form } = this.props
    const keys = form.getFieldValue('emailKeys')
    const nextKeys = keys.concat(this.EmailId++)
    form.setFieldsValue({
      emailKeys: nextKeys
    })
  }

  removePhone = (k: string) => {
    const { form } = this.props
    const keys = form.getFieldValue('phoneKeys')
    if (keys.length === 1) {
      return
    }
    form.setFieldsValue({
      phoneKeys: keys.filter((key: string) => key !== k)
    })
  }

  addPhone = () => {
    const { form } = this.props
    const keys = form.getFieldValue('phoneKeys')
    const nextKeys = keys.concat(this.PhoneId++)
    form.setFieldsValue({
      phoneKeys: nextKeys
    })
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form

    getFieldDecorator('emailKeys', { initialValue: ['main'] })
    const emailKeys = getFieldValue('emailKeys')
    const emailItems = emailKeys.map((k: string, index: number) => (
      <Form.Item label={index === 0 ? '联系邮箱' : ''} required={false} key={k}>
        {getFieldDecorator(`email[${k}]`, {
          rules: [{ type: 'email', message: '请输入合法的邮箱' }]
        })(<Input style={{ width: '90%', marginRight: 8 }} />)}
        {index > 0 ? (
          <Icon
            type='minus'
            className='icon-change-email'
            onClick={() => this.removeEmail(k)}
          />
        ) : (
          <Icon
            className='icon-change-email'
            type='plus'
            onClick={this.addEmail}
          />
        )}
      </Form.Item>
    ))

    getFieldDecorator('phoneKeys', { initialValue: ['main'] })
    const phoneKeys = getFieldValue('phoneKeys')
    const phoneItems = phoneKeys.map((k: string, index: number) => (
      <Form.Item label={index === 0 ? '联系手机' : ''} required={false} key={k}>
        {getFieldDecorator(`phone[${k}]`)(
          <Input style={{ width: '90%', marginRight: 8 }} />
        )}
        {index > 0 ? (
          <Icon
            type='minus'
            className='icon-change-email'
            onClick={() => this.removePhone(k)}
          />
        ) : (
          <Icon
            className='icon-change-email'
            type='plus'
            onClick={this.addPhone}
          />
        )}
      </Form.Item>
    ))

    return (
      <Form className='edit-form' onSubmit={this.handleSubmit}>
        <Form.Item label='昵称'>
          {getFieldDecorator('nickName', {
            rules: [
              {
                required: true,
                message: '请输入昵称'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='个人简介'>
          {getFieldDecorator('userBio')(<Input />)}
        </Form.Item>
        <Form.Item label='性别'>
          {getFieldDecorator('gender', { initialValue: 'man' })(
            <Radio.Group buttonStyle='solid'>
              <Radio.Button value='man'>
                <Icon type='man' className='gender-icon gender-man' />男
              </Radio.Button>
              <Radio.Button value='woman'>
                <Icon type='woman' className='gender-icon gender-woman' />女
              </Radio.Button>
              <Radio.Button value='other'>
                <Icon type='robot' className='gender-icon gender-other' />
                其他
              </Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
        {emailItems}
        {phoneItems}
        <Form.Item label='地区'>
          {getFieldDecorator('location')(<Input />)}
        </Form.Item>
        <Form.Item label='生日'>
          {getFieldDecorator('birthday')(<DatePicker placeholder='选择日期' />)}
        </Form.Item>
        <Button htmlType='submit' type='primary'>
          保存
        </Button>
        <Button
          style={{ marginLeft: '20px' }}
          onClick={() => {
            this.props.next(false)
          }}
        >
          取消
        </Button>
      </Form>
    )
  }
}

export default Form.create()(EditForm)
