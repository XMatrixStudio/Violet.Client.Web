import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import Form, { WrappedFormUtils } from 'antd/lib/form/Form'
import Input from 'antd/lib/input/Input'
import ValidCaptcha from 'src/Pages/Account/Components/Util/ValidCaptcha'
import { Button } from 'antd'

interface IEditPhoneProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
}

class EditPhone extends Component<IEditPhoneProps, any> {
  componentDidMount() {
    document.title = '绑定手机号 | Violet'
  }
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
      <div className='form-layout'>
        <div className='top-layout'>
          <div className='top-text'>
            <p className='title'>绑定手机号</p>
            <p className='sub-title'>绑定手机号可以帮助你通过短信找回密码</p>
          </div>
          {/* <div className='right-text'>
            上次修改密码: <strong>3个月前</strong>
          </div> */}
        </div>

        <Form className='my-form' onSubmit={this.handleSubmit}>
          <Form.Item label='绑定手机号'>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '请输入要绑定的手机号'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <ValidCaptcha form={this.props.form} isNew={false} label={true} />
          <Button type='primary' htmlType='submit'>
            绑定手机号
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
      </div>
    )
  }
}

export default Form.create()(EditPhone)
