import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import './DeveloperForm.less'
import TextArea from 'antd/lib/input/TextArea'

interface IDeveloperFormProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
  next: (isSubmit: boolean) => void
}

class DeveloperForm extends Component<IDeveloperFormProps> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.props.next(true)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='developer-form'>
        <p className='developer-title'>成为一名应用开发者</p>
        <p className='developer-sub-title'>
          请填写您的联系方式(仅内部使用), 方便我们和你进行联系
        </p>
        <Form className='my-form' onSubmit={this.handleSubmit}>
          <Form.Item label='联系名称'>
            {getFieldDecorator('developerName', {
              rules: [
                {
                  required: true,
                  message: '请输入联系名称'
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
          <Form.Item label='备注'>
            {getFieldDecorator('developerNote', {
              rules: [
                {
                  required: false
                }
              ]
            })(<TextArea rows={4} />)}
          </Form.Item>
          <Button type='primary' htmlType='submit'>
            提交信息
          </Button>
          <Button
            className='back-btn'
            onClick={() => {
              this.props.next(false)
            }}
          >
            取消
          </Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(Form.create()(DeveloperForm))
