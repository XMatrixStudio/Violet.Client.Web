import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import './DeveloperForm.less'
import TextArea from 'antd/lib/input/TextArea'
import { inject } from 'mobx-react'
import UIStore from 'src/Store/UIStore'
import { Link } from 'react-router-dom'

interface IDeveloperFormProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
  next: (isSubmit: boolean) => void
  UIStore?: UIStore
}

@inject('UIStore')
class DeveloperForm extends Component<IDeveloperFormProps> {
  componentWillMount() {
    const formType = this.props.match.params.type
    switch (formType) {
      case 'edit':
        this.props.UIStore!.setTitle(
          <>
            <Link key='link' to='/user/apps'>
              应用管理
            </Link>
            <span key='more'> > 开发者信息</span>
          </>,
          '请填写新的联系方式(内部使用), 方便我们与您进行联系'
        )
        break
      case 'developer':
        this.props.UIStore!.setTitle(
          <>
            <Link key='link' to='/user/apps'>
              应用管理
            </Link>
            <span key='more'> > 开发者申请</span>
          </>,
          '请填写您的联系方式(内部使用), 成为一名开发者'
        )
        break
      case 'admin':
        this.props.UIStore!.setTitle(
          <>
            <Link key='link' to='/user/apps'>
              应用管理
            </Link>
            <span key='more'> > 管理员申请</span>
          </>,
          '系统管理员仅允许内部人员申请'
        )
        break
      case 'more':
        this.props.UIStore!.setTitle(
          <>
            <Link key='link' to='/user/apps'>
              应用管理
            </Link>
            <span key='more'> > 应用申请</span>
          </>,
          '请填写您得应用需求，便于我们进行审核'
        )
        break
    }
  }

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
