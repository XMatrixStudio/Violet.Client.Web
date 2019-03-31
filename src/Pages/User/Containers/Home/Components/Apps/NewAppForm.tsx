import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import './NewAppForm.less'
import { Input, Button, Select, message } from 'antd'
import AvatarSelect from '../Utils/AvatarSelect'

interface INewAppFormProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
  next: (isEdit: boolean) => void
}

class NewAppForm extends Component<INewAppFormProps> {
  appIcon?: File

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.appIcon === undefined) {
          message.error('请选择应用图标')
        } else {
          console.log(values)
          this.props.next(true)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='app-form'>
        <p className='app-form-title'>新建应用</p>
        <Form className='my-form' onSubmit={this.handleSubmit}>
          <Form.Item label='创建于(创建后不可更改)'>
            {getFieldDecorator('appFrom', {
              initialValue: 'personal',
              rules: [
                {
                  required: true,
                  message: '请选择创建位置'
                }
              ]
            })(
              <Select style={{ maxWidth: '300px' }}>
                <Select.OptGroup label='个人'>
                  <Select.Option value='personal'>
                    ZhenlyChen (3/10)
                  </Select.Option>
                </Select.OptGroup>
                <Select.OptGroup label='组织'>
                  <Select.Option value='org'>XMatrix (1/10)</Select.Option>
                </Select.OptGroup>
              </Select>
            )}
          </Form.Item>
          <Form.Item label='应用图标'>
            <AvatarSelect
              setImage={file => {
                this.appIcon = file
              }}
            />
          </Form.Item>
          <Form.Item label='应用名称'>
            {getFieldDecorator('appName', {
              rules: [
                {
                  required: true,
                  message: '请输入应用名称'
                }
              ]
            })(<Input placeholder='应用名称将在授权时展示' />)}
          </Form.Item>
          <Form.Item label='应用描述'>
            {getFieldDecorator('appDetail', {
              rules: [
                {
                  required: true,
                  message: '请输入应用描述'
                }
              ]
            })(<Input placeholder='简短地描述你的应用' />)}
          </Form.Item>
          <Form.Item label='应用主页'>
            {getFieldDecorator('appHome', {
              rules: [
                {
                  required: true,
                  message: '请输入应用主页'
                }
              ]
            })(<Input placeholder='https://example.com' />)}
          </Form.Item>
          <Form.Item label='回调地址'>
            {getFieldDecorator('appCallBack', {
              rules: [
                {
                  required: true,
                  message: '请输入回调地址'
                }
              ]
            })(<Input placeholder='https://example.com/verify' />)}
          </Form.Item>

          <Button type='primary' htmlType='submit'>
            新建应用
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

export default withRouter(Form.create()(NewAppForm))
