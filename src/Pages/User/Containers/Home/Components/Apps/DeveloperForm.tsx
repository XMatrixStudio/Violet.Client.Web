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

    let title = '成为一名应用开发者'
    let subTitle = '请填写您的联系方式(仅内部使用), 方便我们和你进行联系'
    const formType = this.props.match.params.type
    console.log(formType)
    console.log(this.props.match)
    switch (formType) {
      case 'admin':
        title = '成为系统管理员'
        subTitle = '系统管理员仅允许内部人员申请'
        break
      case 'more':
        title = '申请更多的应用数'
        subTitle = '请填写需求便于管理员审核'
        break
      case 'edit':
        title = '修改联系信息'
        subTitle = '请填写新的联系方式(仅内部使用), 方便我们和你进行联系'
        break
    }

    return (
      <div className='developer-form'>
        <p className='developer-title'>{title}</p>
        <p className='developer-sub-title'>{subTitle}</p>
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
