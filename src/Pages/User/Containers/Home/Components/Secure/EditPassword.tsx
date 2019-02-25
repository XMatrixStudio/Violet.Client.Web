import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import NewPassword from 'src/Pages/Account/Components/Util/NewPassword'

interface IEditPasswordProps extends RouteComponentProps<any> {
  form: WrappedFormUtils
}

class EditPassword extends Component<IEditPasswordProps, any> {
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
            <p className='title'>修改密码</p>
            <p className='sub-title'>定期修改密码使得你的账号更安全</p>
          </div>
          <div className='right-text'>
            上次修改密码: <strong>3个月前</strong>
          </div>
        </div>
        <Form className='my-form' onSubmit={this.handleSubmit}>
          <Form.Item label='旧密码'>
            {getFieldDecorator('oldPassword', {
              rules: [
                {
                  required: true,
                  message: '请输入旧密码'
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <NewPassword form={this.props.form} label={true} />
          <Button type='primary' htmlType='submit'>
            修改密码
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

export default Form.create()(EditPassword)