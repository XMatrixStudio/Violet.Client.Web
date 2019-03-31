import React, { Component } from 'react'
import './NewOrganization.less'
import { Form, Input, Button } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { WrappedFormUtils } from 'antd/lib/form/Form'

interface INewOrganizationProps {
  form: WrappedFormUtils
}

class NewOrganization extends Component<INewOrganizationProps> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='new-org'>
        <div>组织可以帮助你协作管理应用, 你还可以创建3个组织</div>
        <Form className='my-form' onSubmit={this.handleSubmit}>
          <Form.Item label='组织名'>
            {getFieldDecorator('orgName', {
              rules: [
                {
                  required: true,
                  message: '请输入组织名'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='联系人'>
            {getFieldDecorator('developerName', {
              rules: [
                {
                  required: true,
                  message: '请输入联系人'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='联系邮箱'>
            {getFieldDecorator('developerEmail', {
              rules: [
                {
                  required: true,
                  message: '请输入联系邮箱'
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Button type='primary' htmlType='submit'>
            提交信息
          </Button>
        </Form>
      </div>
    )
  }
}

export default Form.create()(NewOrganization)
