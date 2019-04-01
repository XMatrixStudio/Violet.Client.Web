import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import './DeveloperForm.less'
import TextArea from 'antd/lib/input/TextArea'
import { inject } from 'mobx-react'
import UIStore from 'src/Store/UIStore'

interface IDeveloperFormProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
  next: (isSubmit: boolean) => void
  UIStore?: UIStore
}

@inject('UIStore')
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

    const formType = this.props.match.params.type

    return (
      <div className='developer-form'>
        <Form className='my-form' onSubmit={this.handleSubmit}>
          {formType !== 'more' && formType !== 'admin' && (
            <>
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
            </>
          )}
          {formType !== 'edit' && (
            <Form.Item label='备注'>
              {getFieldDecorator('developerNote', {
                rules: [
                  {
                    required: formType === 'more',
                    message: '请输入备注'
                  }
                ]
              })(<TextArea rows={4} />)}
            </Form.Item>
          )}

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
