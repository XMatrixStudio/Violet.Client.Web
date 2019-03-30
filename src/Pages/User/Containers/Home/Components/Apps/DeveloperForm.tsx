import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import { WrappedFormUtils } from 'antd/lib/form/Form'

interface IDeveloperFormProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
}

class DeveloperForm extends Component<IDeveloperFormProps> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields(['account', 'captcha'], (err, values) => {
      if (!err) {
        console.log(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className='my-form' onSubmit={this.handleSubmit}>
        <Form.Item label='绑定邮箱'>
          {getFieldDecorator('account', {
            rules: [
              {
                required: true,
                message: '请输入要绑定的邮箱'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          绑定邮箱
        </Button>
        <Button
          className='back-btn'
          onClick={() => {
            this.props.history.goBack()
          }}
        >
          取消
        </Button>
      </Form>
    )
  }
}

export default withRouter(Form.create()(DeveloperForm))
